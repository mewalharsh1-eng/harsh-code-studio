// =========================================
// HARSH CODE STUDIO
// MAIN JAVASCRIPT
// =========================================


// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.toggle("active");
        }
    });
}


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements = document.querySelectorAll(
    "section, .about-card, .service-card, .project-card, .contact-card"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((el) => {

        el.classList.add("reveal");
        revealObserver.observe(el);

    });

} else {

    revealElements.forEach((el) => {
        el.classList.add("show");
    });

}


// =========================================
// THEME TOGGLE
// =========================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

} else {

    if (themeToggle) {
        themeToggle.textContent = "🌙";
    }

}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        themeToggle.textContent =
            isDark ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

}


// =========================================
// LOGIN / SIGN UP MODAL
// =========================================

const authModal =
    document.getElementById("authModal");

const authOverlay =
    document.getElementById("authOverlay");

const authClose =
    document.getElementById("authClose");


const loginBtn =
    document.getElementById("loginBtn");

const signupBtn =
    document.getElementById("signupBtn");


const loggedOutButtons =
    document.getElementById("loggedOutButtons");

const loggedInButtons =
    document.getElementById("loggedInButtons");


const dashboardNavBtn =
    document.getElementById("dashboardNavBtn");

const logoutNavBtn =
    document.getElementById("logoutNavBtn");


const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");


const showSignup =
    document.getElementById("showSignup");

const showLogin =
    document.getElementById("showLogin");


const loginMessage =
    document.getElementById("loginMessage");


// =========================================
// SUPABASE CONNECTION
// =========================================

const SUPABASE_URL =
    "https://igeiomoovanfrxjaxoyw.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_u4KBiveOGMe24nkq-1oVwA_zzHY2T_Z";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

console.log("Supabase client ready");


// =========================================
// AUTH MODAL HELPERS
// =========================================

function openAuthModal(mode = "login") {

    if (!authModal) return;

    authModal.classList.add("active");

    if (mode === "signup") {

        if (signupForm) {
            signupForm.classList.add("active");
        }

        if (loginForm) {
            loginForm.classList.remove("active");
        }

    } else {

        if (loginForm) {
            loginForm.classList.add("active");
        }

        if (signupForm) {
            signupForm.classList.remove("active");
        }

    }

}


function closeAuthModal() {

    if (!authModal) return;

    authModal.classList.remove("active");

}


// =========================================
// OPEN LOGIN
// =========================================

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        openAuthModal("login");

    });

}


// =========================================
// OPEN SIGN UP
// =========================================

if (signupBtn) {

    signupBtn.addEventListener("click", () => {

        openAuthModal("signup");

    });

}


// =========================================
// CLOSE AUTH MODAL
// =========================================

if (authClose) {

    authClose.addEventListener(
        "click",
        closeAuthModal
    );

}


if (authOverlay) {

    authOverlay.addEventListener(
        "click",
        closeAuthModal
    );

}


// =========================================
// SWITCH LOGIN → SIGN UP
// =========================================

if (showSignup) {

    showSignup.addEventListener("click", () => {

        if (loginForm) {
            loginForm.classList.remove("active");
        }

        if (signupForm) {
            signupForm.classList.add("active");
        }

    });

}


// =========================================
// SWITCH SIGN UP → LOGIN
// =========================================

if (showLogin) {

    showLogin.addEventListener("click", () => {

        if (signupForm) {
            signupForm.classList.remove("active");
        }

        if (loginForm) {
            loginForm.classList.add("active");
        }

    });

}


// =========================================
// CLOSE AUTH MODAL WITH ESC
// =========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeAuthModal();

        closeAdminPanel();

    }

});


// =========================================
// SUPABASE ADMIN LOGIN
// =========================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const emailInput =
                document.getElementById("loginEmail");

            const passwordInput =
                document.getElementById("loginPassword");


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (!email || !password) {

                if (loginMessage) {
                    loginMessage.textContent =
                        "❌ Email and password required.";
                }

                return;

            }


            if (loginMessage) {
                loginMessage.textContent =
                    "Logging in...";
            }


            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );

                if (loginMessage) {
                    loginMessage.textContent =
                        "❌ Invalid email or password.";
                }

                return;

            }


            console.log(
                "LOGIN SUCCESS:",
                data
            );


            if (loginMessage) {

                loginMessage.textContent =
                    "✅ Login successful!";

            }


            setTimeout(() => {

                closeAuthModal();

                loginForm.reset();

            }, 700);

        }
    );

}


// =========================================
// SIGN UP
// =========================================

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const emailInput =
                document.getElementById("signupEmail");

            const passwordInput =
                document.getElementById("signupPassword");


            if (!emailInput || !passwordInput) {
                return;
            }


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {
                return;
            }


            const signupMessage =
                document.getElementById("signupMessage");


            if (signupMessage) {
                signupMessage.textContent =
                    "Creating account...";
            }


            const { data, error } =
                await supabaseClient.auth.signUp({
                    email: email,
                    password: password
                });


            if (error) {

                console.error(
                    "SIGNUP ERROR:",
                    error
                );

                if (signupMessage) {
                    signupMessage.textContent =
                        "❌ " + error.message;
                }

                return;

            }


            console.log(
                "SIGNUP SUCCESS:",
                data
            );


            if (signupMessage) {

                signupMessage.textContent =
                    "✅ Account created successfully!";

            }

        }
    );

}


// =========================================
// CONTACT METHOD SELECTOR
// =========================================

const contactOptions =
    document.querySelectorAll(".contact-option");

const contactAction =
    document.getElementById("contactAction");

let selectedContact = null;


contactOptions.forEach(option => {

    option.addEventListener("click", () => {

        contactOptions.forEach(item => {

            item.classList.remove("selected");

        });


        option.classList.add("selected");


        selectedContact =
            option.dataset.contact;


        if (selectedContact === "whatsapp") {

            if (contactAction) {

                contactAction.innerHTML =
                    "💬 Contact on WhatsApp";

            }

        }


        if (selectedContact === "email") {

            if (contactAction) {

                contactAction.innerHTML =
                    "📧 Contact via Email";

            }

        }

    });

});


if (contactAction) {

    contactAction.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (selectedContact === "whatsapp") {

                window.open(
                    "https://wa.me/918700829677",
                    "_blank"
                );

            }

            else if (selectedContact === "email") {

                window.location.href =
                    "mailto:mewalharsh1@gmail.com";

            }

            else {

                alert(
                    "Please select a contact method first."
                );

            }

        }
    );

}


// =========================================
// PROJECT FORM
// =========================================

const projectForm =
    document.getElementById("projectForm");

const projectMessage =
    document.getElementById("projectMessage");


// =========================================
// ADD / UPDATE PROJECT
// =========================================

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const titleInput =
                document.getElementById("projectTitle");

            const descriptionInput =
                document.getElementById("projectDescription");

            const technologiesInput =
                document.getElementById("projectTechnologies");

            const imageInput =
                document.getElementById("projectImage");

            const projectUrlInput =
                document.getElementById("projectUrl");

            const githubUrlInput =
                document.getElementById("githubUrl");


            const title =
                titleInput
                    ? titleInput.value.trim()
                    : "";

            const description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";

            const technologies =
                technologiesInput
                    ? technologiesInput.value.trim()
                    : "";

            const image_url =
                imageInput
                    ? imageInput.value.trim()
                    : "";

            const project_url =
                projectUrlInput
                    ? projectUrlInput.value.trim()
                    : "";

            const github_url =
                githubUrlInput
                    ? githubUrlInput.value.trim()
                    : "";


            const editingId =
                projectForm.dataset.editingId;


            if (!title) {

                if (projectMessage) {
                    projectMessage.textContent =
                        "❌ Project title required.";
                }

                return;

            }


            // =========================================
            // UPDATE EXISTING PROJECT
            // =========================================

            if (editingId) {

                console.log(
                    "UPDATING PROJECT ID:",
                    editingId
                );


                if (projectMessage) {
                    projectMessage.textContent =
                        "Updating project...";
                }


                const {
                    data: updatedProject,
                    error
                } = await supabaseClient
                    .from("projects")
                    .update({
                        title,
                        description,
                        technologies,
                        image_url,
                        project_url,
                        github_url
                    })
                    .eq("id", editingId)
                    .select()
                    .single();


                console.log(
                    "UPDATED PROJECT:",
                    updatedProject
                );

                console.log(
                    "UPDATE ERROR:",
                    error
                );


                if (error) {

                    console.error(
                        "UPDATE PROJECT ERROR:",
                        error
                    );

                    if (projectMessage) {
                        projectMessage.textContent =
                            "❌ Project update nahi hua.";
                    }

                    return;

                }


                if (projectMessage) {

                    projectMessage.textContent =
                        "✅ Project successfully updated!";

                }


                delete projectForm.dataset.editingId;


                const submitButton =
                    document.querySelector(".admin-submit");


                if (submitButton) {

                    submitButton.textContent =
                        "➕ Add Project";

                }


                projectForm.reset();


                await loadAdminProjects();

                await loadProjects();


                return;

            }


            // =========================================
            // ADD NEW PROJECT
            // =========================================

            if (projectMessage) {

                projectMessage.textContent =
                    "Adding project...";

            }


            const {
                error
            } = await supabaseClient
                .from("projects")
                .insert([
                    {
                        title,
                        description,
                        technologies,
                        image_url,
                        project_url,
                        github_url
                    }
                ]);


            if (error) {

                console.error(
                    "SUPABASE ERROR:",
                    error
                );

                if (projectMessage) {

                    projectMessage.textContent =
                        "❌ Project add nahi hua. Console check karo.";

                }

                return;

            }


            if (projectMessage) {

                projectMessage.textContent =
                    "✅ Project successfully added!";

            }


            projectForm.reset();


            await loadAdminProjects();

            await loadProjects();

        }
    );

}


// =========================================
// FETCH PROJECTS FROM SUPABASE
// =========================================

async function fetchProjects() {

    const {
        data,
        error
    } = await supabaseClient
        .from("projects")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "PROJECT FETCH ERROR:",
            error
        );

        return [];

    }


    console.log(
        "ALL PROJECTS FROM SUPABASE:",
        data
    );


    return data || [];

}


// =========================================
// PUBLIC PROJECTS
// =========================================

async function loadProjects() {

    const projectGrid =
        document.getElementById("projectGrid");


    if (!projectGrid) {
        return;
    }


    projectGrid.innerHTML = `
        <p style="text-align:center;width:100%;">
            Loading projects...
        </p>
    `;


    const data =
        await fetchProjects();


    if (!data.length) {

        projectGrid.innerHTML = `
            <p style="text-align:center;width:100%;">
                No projects added yet.
            </p>
        `;

        return;

    }


    projectGrid.innerHTML = "";


    data.forEach((project, index) => {

        const card =
            document.createElement("div");


        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-image">

                ${project.image_url
                ? `
                        <img
                            src="${project.image_url}"
                            alt="${project.title || "Project"}"
                        >
                    `
                : `
                        <div class="project-number">
                            PROJECT ${String(index + 1).padStart(2, "0")}
                        </div>
                    `
            }

            </div>


            <div class="project-content">

                <h3>
                    ${project.title || "Untitled Project"}
                </h3>


                <p>
                    ${project.description || ""}
                </p>


                <span>
                    ${project.technologies || ""}
                </span>


                ${project.project_url
                ? `
                        <a
                            href="${project.project_url}"
                            target="_blank"
                            rel="noopener"
                            class="project-link"
                        >
                            View Project →
                        </a>
                    `
                : ""
            }

            </div>

        `;


        projectGrid.appendChild(card);

    });

}


// =========================================
// ADMIN PROJECTS
// =========================================

async function loadAdminProjects() {

    const adminList =
        document.getElementById("adminProjectList");


    if (!adminList) {
        return;
    }


    adminList.innerHTML = `
        <p>
            Loading projects...
        </p>
    `;


    const data =
        await fetchProjects();


    console.log(
        "ADMIN PROJECTS:",
        data
    );


    // =========================================
    // UPDATE DASHBOARD COUNT
    // =========================================

    const countElement =
        document.getElementById("adminProjectCount");


    if (countElement) {

        countElement.textContent =
            data.length;

    }


    // =========================================
    // NO PROJECTS
    // =========================================

    if (!data.length) {

        adminList.innerHTML = `
            <p>
                No projects added yet.
            </p>
        `;

        return;

    }


    // =========================================
    // SHOW EXISTING PROJECTS
    // =========================================

    adminList.innerHTML = "";


    data.forEach((project) => {

        const item =
            document.createElement("div");


        item.className =
            "admin-project-item";


        item.innerHTML = `

            <div class="admin-project-info">

                <h4>
                    ${project.title || "Untitled Project"}
                </h4>


                <p>
                    ${project.description || ""}
                </p>


                <span>
                    ${project.technologies || ""}
                </span>

            </div>


            <div class="admin-project-actions">

                <button
                    type="button"
                    class="edit-project-btn"
                    data-id="${project.id}"
                >
                    ✏️ Edit
                </button>


                <button
                    type="button"
                    class="delete-project-btn"
                    data-id="${project.id}"
                >
                    🗑️ Delete
                </button>

            </div>

        `;


        adminList.appendChild(item);

    });

}

// =========================================
// EDIT PROJECT
// =========================================

document.addEventListener("click", async (event) => {

    const editButton = event.target.closest(".edit-project-btn");

    if (!editButton) {
        return;
    }

    const projectId = editButton.dataset.id;

    if (!projectId) {
        return;
    }

     // =========================================
// OPEN DASHBOARD FIRST
// =========================================

if (adminPanel) {

    // Purani scroll position reset
    adminPanel.scrollTop = 0;

    adminPanel.classList.add("admin-panel-open");

    if (adminOverlay) {
        adminOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";

    // Drawer ko fresh position par rakho
    requestAnimationFrame(() => {
        adminPanel.scrollTop = 0;
    });
}


    // =========================================
    // LOAD PROJECT
    // =========================================

    const {
        data,
        error
    } = await supabaseClient
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();


    if (error) {

        console.error(
            "EDIT PROJECT LOAD ERROR:",
            error
        );

        alert("❌ Project load nahi hua.");

        return;
    }


    // =========================================
    // FILL EDIT FORM
    // =========================================

    const projectTitle =
        document.getElementById("projectTitle");

    const projectDescription =
        document.getElementById("projectDescription");

    const projectTechnologies =
        document.getElementById("projectTechnologies");

    const projectImage =
        document.getElementById("projectImage");

    const projectUrl =
        document.getElementById("projectUrl");

    const githubUrl =
        document.getElementById("githubUrl");


    if (projectTitle) {
        projectTitle.value = data.title || "";
    }

    if (projectDescription) {
        projectDescription.value = data.description || "";
    }

    if (projectTechnologies) {
        projectTechnologies.value = data.technologies || "";
    }

    if (projectImage) {
        projectImage.value = data.image_url || "";
    }

    if (projectUrl) {
        projectUrl.value = data.project_url || "";
    }

    if (githubUrl) {
        githubUrl.value = data.github_url || "";
    }


    // =========================================
    // STORE EDITING ID
    // =========================================

    if (projectForm) {

        projectForm.dataset.editingId =
            projectId;

    }


    // =========================================
    // CHANGE BUTTON
    // =========================================

    const submitButton =
        document.querySelector(".admin-submit");


    if (submitButton) {

        submitButton.textContent =
            "💾 Update Project";

    }


    // =========================================
    // SCROLL DIRECTLY TO EDIT PROJECT FORM
    // =========================================

    setTimeout(() => {

        if (projectForm) {

            projectForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }, 250);

});

// =========================================
// CANCEL EDIT MODE
// =========================================

const cancelEditBtn =
    document.getElementById("cancelEditBtn");


if (cancelEditBtn) {

    cancelEditBtn.addEventListener(
        "click",
        () => {

            if (!projectForm) {
                return;
            }


            delete projectForm.dataset.editingId;


            projectForm.reset();


            const submitButton =
                document.querySelector(".admin-submit");


            if (submitButton) {

                submitButton.textContent =
                    "➕ Add Project";

            }


            if (projectMessage) {

                projectMessage.textContent = "";

            }

        }
    );

}


// =========================================
// DELETE PROJECT
// =========================================

document.addEventListener(
    "click",
    async (event) => {

        const deleteButton =
            event.target.closest(
                ".delete-project-btn"
            );


        if (!deleteButton) {
            return;
        }


        const projectId =
            deleteButton.dataset.id;


        if (!projectId) {
            return;
        }


        const deleteModal =
            document.getElementById(
                "deleteModal"
            );


        const deleteConfirmBtn =
            document.getElementById(
                "deleteConfirmBtn"
            );


        const deleteCancelBtn =
            document.getElementById(
                "deleteCancelBtn"
            );


        if (
            !deleteModal ||
            !deleteConfirmBtn ||
            !deleteCancelBtn
        ) {

            console.error(
                "Delete modal elements not found."
            );

            return;

        }


        deleteModal.classList.add(
            "active"
        );


        deleteCancelBtn.onclick = () => {

            deleteModal.classList.remove(
                "active"
            );

        };


        deleteConfirmBtn.onclick =
            async () => {

                deleteModal.classList.remove(
                    "active"
                );


                const {
                    error
                } = await supabaseClient
                    .from("projects")
                    .delete()
                    .eq("id", projectId);


                // =========================================
                // IMPORTANT:
                // ERROR IS CHECKED INSIDE SAME FUNCTION
                // =========================================

                if (error) {

                    console.error(
                        "DELETE PROJECT ERROR:",
                        error
                    );

                    alert(
                        "❌ Project delete nahi hua."
                    );

                    return;

                }


                alert(
                    "✅ Project successfully deleted."
                );


                // Refresh both lists

                await loadAdminProjects();

                await loadProjects();

            };

    }
);


// =========================================
// ADMIN PANEL ACCESS
// =========================================

const adminPanel =
    document.getElementById(
        "adminPanel"
    );


async function checkAdminAccess() {

    if (!adminPanel) {
        return;
    }


    const {
        data
    } = await supabaseClient.auth.getSession();


    if (data && data.session) {

        adminPanel.style.display =
            "block";

        console.log(
            "ADMIN ACCESS GRANTED"
        );

    } else {

        adminPanel.style.display =
            "none";

        console.log(
            "ADMIN ACCESS DENIED"
        );

    }

}


// =========================================
// ADMIN DASHBOARD DRAWER
// =========================================

const adminPanelClose =
    document.getElementById(
        "adminPanelClose"
    );


let adminOverlay =
    document.querySelector(
        ".admin-panel-overlay"
    );


// =========================================
// CREATE OVERLAY AUTOMATICALLY
// =========================================

if (!adminOverlay) {

    adminOverlay =
        document.createElement(
            "div"
        );


    adminOverlay.className =
        "admin-panel-overlay";


    document.body.appendChild(
        adminOverlay
    );

}

// =========================================
// OPEN DASHBOARD
// =========================================

let dashboardOpening = false;

if (dashboardNavBtn) {

    dashboardNavBtn.addEventListener(
        "click",
        async () => {

            // Double click / repeated click ko prevent karo
            if (dashboardOpening) {
                return;
            }

            if (!adminPanel) {
                return;
            }

            dashboardOpening = true;

            try {

                // Current login check
                const {
                    data,
                    error
                } = await supabaseClient.auth.getSession();

                if (error) {

                    console.error(
                        "DASHBOARD SESSION ERROR:",
                        error
                    );

                    return;
                }

                if (!data || !data.session) {

                    alert(
                        "Please login first."
                    );

                    return;
                }

                // Purani state clear
                adminPanel.classList.remove(
                    "admin-panel-open"
                );

                if (adminOverlay) {
                    adminOverlay.classList.remove(
                        "active"
                    );
                }

                // Fresh scroll position
                adminPanel.scrollTop = 0;

                // Dashboard open
                adminPanel.classList.add(
                    "admin-panel-open"
                );

                if (adminOverlay) {
                    adminOverlay.classList.add(
                        "active"
                    );
                }

                document.body.style.overflow =
                    "hidden";

                // Projects load karo
                await loadAdminProjects();

                // Load ke baad bhi top par rakho
                adminPanel.scrollTop = 0;

            } catch (error) {

                console.error(
                    "DASHBOARD OPEN ERROR:",
                    error
                );

            } finally {

                dashboardOpening = false;

            }

        }
    );

}
 
 

// =========================================
// CLOSE BUTTON
// =========================================

if (adminPanelClose) {

    adminPanelClose.addEventListener(
        "click",
        closeAdminPanel
    );

}



 // =========================================
// ADMIN PANEL CLOSE
// =========================================

function closeAdminPanel() {

    const adminPanel =
        document.getElementById("adminPanel");

    const adminOverlay =
        document.querySelector(
            ".admin-panel-overlay"
        );


    if (!adminPanel) return;


    // Close dashboard
    adminPanel.classList.remove(
        "admin-panel-open"
    );


    // Remove any old states too
    adminPanel.classList.remove(
        "active"
    );

    adminPanel.classList.remove(
        "open"
    );


    // Close overlay
    if (adminOverlay) {

        adminOverlay.classList.remove(
            "active"
        );

    }


    // Restore page scrolling
    document.body.classList.remove(
        "admin-panel-open"
    );

    document.body.style.overflow = "";


    console.log(
        "ADMIN DASHBOARD CLOSED"
    );
}


// =========================================
// CLICK OUTSIDE
// =========================================

if (adminOverlay) {

    adminOverlay.addEventListener(
        "click",
        closeAdminPanel
    );

}


// =========================================
// LOGOUT
// =========================================

if (logoutNavBtn) {

    logoutNavBtn.addEventListener(
        "click",
        async () => {

            const {
                error
            } =
                await supabaseClient.auth.signOut();


            if (error) {

                console.error(
                    "LOGOUT ERROR:",
                    error
                );

                alert(
                    "❌ Logout nahi hua. Please try again."
                );

                return;

            }


            closeAdminPanel();


            console.log(
                "LOGOUT SUCCESS"
            );

        }
    );

}


// =========================================
// WATCH LOGIN / LOGOUT STATE
// =========================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "AUTH STATE:",
            event
        );


        // =========================================
        // ADMIN UI VISIBILITY
        // =========================================

        const adminElements = document.querySelectorAll(
            ".admin-panel, .admin-projects, .admin-project-item, .edit-project-btn, .delete-project-btn, .admin-submit, #projectForm, #dashboardNavBtn, #logoutNavBtn"
        );

        adminElements.forEach((element) => {

            if (session) {

                element.style.display = "";

            } else {

                element.style.display = "none";

            }

        });

        // =========================================
        // NAVBAR AUTH STATE
        // =========================================

        if (
            loggedOutButtons &&
            loggedInButtons
        ) {

            if (session) {

                loggedOutButtons.style.display =
                    "none";

                loggedInButtons.style.display =
                    "flex";

            } else {

                loggedOutButtons.style.display =
                    "flex";

                loggedInButtons.style.display =
                    "none";

            }

        }


        // =========================================
        // LOAD ADMIN PROJECTS AFTER LOGIN
        // =========================================

        if (session) {

            loadAdminProjects();

        }

    }
);


// =========================================
// INITIAL AUTH CHECK
// =========================================

checkAdminAccess();


// =========================================
// INITIAL PROJECT LOAD
// =========================================

loadProjects();


// =========================================
// INITIAL ADMIN PROJECT LOAD
// =========================================

loadAdminProjects();


   // =========================================
// PROFILE SETTINGS → SUPABASE
// =========================================

async function loadProfileSettings() {

    const {
        data: { user },
        error: authError
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
        console.log("No logged-in user for profile.");
        return;
    }

    // -----------------------------
    // EMAIL FROM SUPABASE AUTH
    // -----------------------------

    const emailInput =
        document.getElementById("profileEmail");

    if (emailInput) {
        emailInput.value = user.email || "";
    }


    // -----------------------------
    // LOAD PROFILE
    // -----------------------------

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("id, full_name, bio, avatar_url")
            .eq("id", user.id)
            .maybeSingle();

    if (profileError) {

        console.error(
            "PROFILE LOAD ERROR:",
            profileError
        );

        return;
    }


    if (!profile) {

        console.log(
            "No profile row found for this user."
        );

        return;
    }


    // -----------------------------
    // FILL PROFILE NAME
    // -----------------------------

    const nameInput =
        document.getElementById("profileName");

    if (nameInput) {
        nameInput.value =
            profile.full_name || "";
    }


    // -----------------------------
    // FILL BIO
    // -----------------------------

    const bioInput =
        document.getElementById("profileBio");

    if (bioInput) {
        bioInput.value =
            profile.bio || "";
    }


    console.log(
        "PROFILE LOADED:",
        profile
    );
}


// =========================================
// SAVE PROFILE SETTINGS
// =========================================

document.addEventListener("click", async function (event) {

    const button = event.target.closest("#saveProfileSettings");

    if (!button) return;

    console.log("SAVE PROFILE BUTTON CLICKED");

    const {
        data: { user },
        error: authError
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {

        console.error("PROFILE AUTH ERROR:", authError);

        return;
    }

    const nameInput =
        document.getElementById("profileName");

    const bioInput =
        document.getElementById("profileBio");

    const message =
        document.getElementById("profileSettingsMessage");

    const fullName =
        nameInput ? nameInput.value.trim() : "";

    const bio =
        bioInput ? bioInput.value.trim() : "";

    if (message) {
        message.textContent = "Saving profile...";
    }

    console.log("PROFILE DATA:", {
        fullName,
        bio,
        userId: user.id
    });

    const { error: updateError } =
        await supabaseClient
            .from("profiles")
            .update({
                full_name: fullName,
                bio: bio
            })
            .eq("id", user.id);

    if (updateError) {

        console.error(
            "PROFILE UPDATE ERROR:",
            updateError
        );

        if (message) {
            message.textContent =
                "❌ Profile save nahi hua.";
        }

        return;
    }

    if (message) {
        message.textContent =
            "✅ Profile successfully saved!";
    }

    console.log(
        "PROFILE UPDATED SUCCESSFULLY"
    );
}); 

// =========================================
// LOAD PROFILE AFTER LOGIN
// =========================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        if (
            event === "SIGNED_IN" &&
            session?.user
        ) {

            setTimeout(() => {
                loadProfileSettings();
            }, 300);

        }

    }
);
