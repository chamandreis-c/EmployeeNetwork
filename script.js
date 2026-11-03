
const departments = [
    { name: "HR", count: 8, assistants: 1 },
    { name: "Finance", count: 10, assistants: 2 },
    { name: "IT", count: 10, assistants: 2 },
    { name: "Marketing", count: 12, assistants: 2 },
    { name: "Sales", count: 20, assistants: 3 },
    { name: "Operations", count: 22, assistants: 3 },
    { name: "Legal and Compliance", count: 4, assistants: 1 },
    { name: "Customer Service", count: 14, assistants: 2 }
];

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = null;

// STEP 1: CREATE EXACTLY 100 EMPLOYEES
function createEmployees() {
    if (employees.length === 100) return;

    employees = [];

    const employeeNames = [
        // HR (EMP001 - EMP008)
        "Cham Andrei Saturinas",
        "Lyca Mae Santos",
        "Shareena Cruz",
        "Robert Reyes",
        "Keisha Garcia",
        "Myka Flores",
        "Karyll Mendoza",
        "Sophia Ramos",

        // FINANCE (EMP009 - EMP018)
        "Kirby Aquino",
        "Christian Torres",
        "Daniel Dela Cruz",
        "Grace Villanueva",
        "Miguel Fernandez",
        "Angela Bautista",
        "Paul Castillo",
        "Nicole Gonzales",
        "Joshua Navarro",
        "Ashley Morales",

        // IT (EMP019 - EMP028)
        "Kevin Ramirez",
        "James Perez",
        "Mark Santiago",
        "Samantha Rivera",
        "John Mendoza",
        "Nathan Lopez",
        "Bianca Flores",
        "Patrick Garcia",
        "Ella Martinez",
        "Adrian Cruz",

        // MARKETING (EMP029 - EMP040)
        "Isabella Reyes",
        "Gabriel Santos",
        "Hannah Aquino",
        "Carlo Dela Cruz",
        "Jasmine Torres",
        "Rafael Castillo",
        "Mikaela Ramos",
        "Sean Villanueva",
        "Trisha Fernandez",
        "Lorenzo Bautista",
        "Camille Navarro",
        "Enzo Morales",

        // SALES (EMP041 - EMP060)
        "Andrea Perez",
        "Joshua Santiago",
        "Kyla Rivera",
        "Matthew Lopez",
        "Patricia Martinez",
        "Vincent Ramirez",
        "Alyssa Gonzales",
        "Derek Flores",
        "Beatrice Santos",
        "Nathaniel Reyes",
        "Christine Garcia",
        "Francis Mendoza",
        "Julia Aquino",
        "Harvey Torres",
        "Danica Cruz",
        "Jerome Castillo",
        "Nicole Dela Cruz",
        "Tristan Ramos",
        "Faith Navarro",
        "Aaron Villanueva",

        // OPERATIONS (EMP061 - EMP082)
        "Michelle Fernandez",
        "Kenneth Bautista",
        "Abigail Morales",
        "Renz Santiago",
        "Dianne Perez",
        "Kyle Ramirez",
        "Erika Lopez",
        "Dominic Martinez",
        "Clarisse Rivera",
        "Jared Gonzales",
        "Marlon Santos",
        "Angelica Reyes",
        "Bryan Garcia",
        "Francesca Flores",
        "Paolo Mendoza",
        "Kristine Aquino",
        "Cedric Torres",
        "Maureen Cruz",
        "Ralph Castillo",
        "Denise Navarro",
        "Aiden Dela Cruz",
        "Sheena Ramos",

        // LEGAL AND COMPLIANCE (EMP083 - EMP086)
        "Gabrielle Villanueva",
        "Marco Fernandez",
        "Therese Bautista",
        "Dylan Morales",

        // CUSTOMER SERVICE (EMP087 - EMP100)
        "Catherine Santos",
        "Benjamin Reyes",
        "Leah Garcia",
        "Angelo Flores",
        "Trisha Mendoza",
        "Martin Aquino",
        "Rica Torres",
        "Nathaniel Cruz",
        "Mia Castillo",
        "Ethan Navarro",
        "Sofia Dela Cruz",
        "Lucas Ramos",
        "Ariana Perez",
        "Caleb Rivera"
    ];

    function addEmployee(department, position) {
        const number = employees.length + 1;

        employees.push({
            id: "EMP" + String(number).padStart(3, "0"),
            name: employeeNames[number - 1],
            department: department,
            position: position,
            jobTitle: position,
            password: "1234"
        });
    }

    departments.forEach((dept) => {
        let remaining = dept.count;

        if (dept.name === "HR") {
            addEmployee(dept.name, "CEO");
            remaining--;
        }

        addEmployee(dept.name, "Department Manager");
        remaining--;

        for (let i = 0; i < dept.assistants; i++) {
            addEmployee(dept.name, "Assistant Manager");
            remaining--;
        }

        const teamLeaders =
            dept.name === "Sales" || dept.name === "Operations"
                ? 2 : 1;

        for (let i = 0; i < teamLeaders; i++) {
            addEmployee(dept.name, "Team Leader");
            remaining--;
        }

        for (let i = 0; i < remaining; i++) {
            addEmployee(dept.name, "Regular Employee");
        }
    });

    saveEmployees();
}

function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// STEP 2: LOGIN
function login() {
    const id = document.getElementById("loginId")
        .value.trim();
    const password = document.getElementById("loginPassword")
        .value;

    const message = document.getElementById("loginMessage");

    if (id === "admin" && password === "admin123") {
        currentUser = { id: "ADMIN", name: "Administrator" };
    } else {
        currentUser = employees.find(employee =>
            employee.id.toLowerCase() === id.toLowerCase()
            && employee.password === password
        );
    }

    if (!currentUser) {
        message.textContent = "Incorrect ID or password.";
        return;
    }

    message.textContent = "";

    document.getElementById("loginSection").hidden = true;
    document.getElementById("appSection").hidden = false;
    document.getElementById("welcome").textContent =
        "Welcome, " + currentUser.name + "!";

    document.getElementById("adminButton").hidden =
        currentUser.id !== "ADMIN";

    showPage("searchPage");
}

// STEP 3: SHOW THE SELECTED PAGE
function showPage(pageId) {
    if (pageId === "adminPage" && currentUser.id !== "ADMIN") {
        return;
    }

    document.querySelectorAll(".page").forEach(page => {
        page.hidden = true;
    });

    document.getElementById(pageId).hidden = false;

    if (pageId === "searchPage") searchEmployees();
    if (pageId === "directoryPage") showDirectory();
    if (pageId === "feedPage") showFeed();
    if (pageId === "profilePage") showProfile();
    if (pageId === "adminPage") adminDashboard();
}

// STEP 4: SEARCH BY NAME, JOB TITLE, OR DEPARTMENT
function searchEmployees() {
    const keyword = document.getElementById("searchInput")
        .value.trim().toLowerCase();

    const matches = employees.filter(employee =>
        employee.name.toLowerCase().includes(keyword) ||
        employee.jobTitle.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword) ||
        employee.position.toLowerCase().includes(keyword)
    );

    displayEmployees(matches, "searchResults");
}

// STEP 5: DISPLAY EMPLOYEE CARDS
function displayEmployees(list, elementId) {
    const container = document.getElementById(elementId);

    if (list.length === 0) {
        container.innerHTML = "<p>No employees found.</p>";
        return;
    }

    container.innerHTML = list.map(employee => `
        <div class="employee-card">
            <h3>${escapeHTML(employee.name)}</h3>
            <p><b>ID:</b> ${employee.id}</p>
            <p><b>Job Title:</b> ${escapeHTML(employee.jobTitle)}</p>
            <p><b>Department:</b>
                ${escapeHTML(employee.department)}</p>
        </div>
    `).join("");
}

function showDirectory() {
    displayEmployees(employees, "directoryResults");
}

// STEP 6: CREATE A SOCIAL POST
function createPost() {
    const input = document.getElementById("postInput");
    const message = input.value.trim();

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    posts.unshift({
        id: Date.now(),
        author: currentUser.name,
        message: message,
        likes: 0,
        comments: []
    });

    input.value = "";
    savePosts();
    showFeed();
}

function showFee
() {
    const container = document.getElementById("feedResults");

    if (posts.length === 0) {
        container.innerHTML = "<p>No posts yet. Share an update!</p>";
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <h3>${escapeHTML(post.author)}</h3>
            <p>${escapeHTML(post.message)}</p>
            <p>Likes: ${post.likes}</p>
            <button onclick="likePost(${post.id})">Like</button>
            <button onclick="commentPost(${post.id})">Comment</button>
            <p>Comments: ${post.comments.length}</p>
            ${post.comments.map(comment =>
                `<p>${escapeHTML(comment)}</p>`
            ).join("")}
        </div>
    `).join("");
}

function likePost(postId) {
    const post = posts.find(item => item.id === postId);
    if (!post) return;

    post.likes++;
    savePosts();
    showFeed();
}

function commentPost(postId) {
    const comment = prompt("Enter your comment:");

    if (!comment || !comment.trim()) return;

    const post = posts.find(item => item.id === postId);
    if (!post) return;

    post.comments.push(currentUser.name + ": " + comment.trim());
    savePosts();
    showFeed();
}

// STEP 7: VIEW AND UPDATE PROFILE
function showProfile() {
    const employee = employees.find(
        item => item.id === currentUser.id
    );

    const details = document.getElementById("profileDetails");

    if (!employee) {
        details.innerHTML = "<p>Administrator account.</p>";
        document.getElementById("newName").hidden = true;
        return;
    }

    document.getElementById("newName").hidden = false;

    details.innerHTML = `
        <p><b>ID:</b> ${employee.id}</p>
        <p><b>Name:</b> ${escapeHTML(employee.name)}</p>
        <p><b>Job Title:</b> ${escapeHTML(employee.jobTitle)}</p>
        <p><b>Department:</b>
            ${escapeHTML(employee.department)}</p>
    `;

    document.getElementById("newName").value = employee.name;
}

function updateProfile() {
    const employee = employees.find(
        item => item.id === currentUser.id
    );

    if (!employee) return;

    const newName = document.getElementById("newName")
        .value.trim();

    if (!newName) {
        alert("Name cannot be empty.");
        return;
    }

    employee.name = newName;
    currentUser.name = newName;

    saveEmployees();

    document.getElementById("welcome").textContent =
        "Welcome, " + currentUser.name + "!";

    showProfile();
    alert("Profile updated!");
}

// STEP 8: ADMIN DASHBOARD
function adminDashboard() {
    if (currentUser.id !== "ADMIN") return;

    document.getElementById("employeeCount").textContent =
        "Total Employees: " + employees.length;

    displayEmployees(employees, "adminResults");
}

// STEP 9: LOGOUT
function logout() {
    currentUser = null;

    document.getElementById("loginSection").hidden = false;
    document.getElementById("appSection").hidden = true;

    document.getElementById("loginId").value = "";
    document.getElementById("loginPassword").value = "";

    document.getElementById("loginMessage").textContent = "";
}

// BASIC HTML SAFETY FOR DISPLAYED TEXT
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// START THE SYSTEM
createEmployees();

/*START THE SYSTEM
localStorage.removeItem("employees");
employees = [];

createEmployees();*/