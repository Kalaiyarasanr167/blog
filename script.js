
const blogs = [
    {
        id: 1,
        title: "How to Become a Better Web Developer",
        category: "Web Development",
        description: "Learn the essential skills and habits that can help you become a better web developer.",
        content: "Becoming a good web developer requires consistent practice, understanding the fundamentals and building real-world projects. Start with HTML, CSS and JavaScript before moving into frameworks and backend technologies.",
        takeaway: "Build projects regularly instead of only watching tutorials.",
        author: "Alex Johnson",
        date: "Sep 28, 2026",
        readTime: "5 min read",
        icon: "🌐"
    },

    {
        id: 2,
        title: "JavaScript Concepts Every Developer Should Know",
        category: "JavaScript",
        description: "Understand variables, functions, arrays, objects, promises and modern JavaScript.",
        content: "JavaScript is one of the most popular programming languages for web development. Understanding core concepts such as functions, arrays, objects, scope, callbacks and promises will make advanced development much easier.",
        takeaway: "Strong JavaScript fundamentals make frameworks much easier to learn.",
        author: "Sarah Williams",
        date: "Sep 25, 2026",
        readTime: "7 min read",
        icon: "⚡"
    },

    {
        id: 3,
        title: "How to Start Your Programming Career",
        category: "Career",
        description: "A practical guide for students who want to start their career in software development.",
        content: "Starting a programming career can feel difficult, but a clear learning path makes it easier. Focus on one programming language, learn data structures, create projects and practice coding interview questions.",
        takeaway: "Consistency is more important than learning everything at once.",
        author: "David Miller",
        date: "Sep 22, 2026",
        readTime: "6 min read",
        icon: "🚀"
    },

    {
        id: 4,
        title: "Understanding Object Oriented Programming",
        category: "Programming",
        description: "Learn the four important concepts of OOP with simple examples.",
        content: "Object Oriented Programming is a programming approach based on objects and classes. Encapsulation, inheritance, polymorphism and abstraction are the four major concepts every developer should understand.",
        takeaway: "OOP helps you organize large programs into reusable components.",
        author: "Michael Smith",
        date: "Sep 20, 2026",
        readTime: "8 min read",
        icon: "💻"
    },

    {
        id: 5,
        title: "The Future of Artificial Intelligence",
        category: "Technology",
        description: "Explore how artificial intelligence is changing software development and everyday life.",
        content: "Artificial intelligence is rapidly becoming part of modern software development. AI tools can help developers write code, analyze information, automate repetitive tasks and build intelligent applications.",
        takeaway: "Developers should learn how to work effectively with AI tools.",
        author: "Emma Brown",
        date: "Sep 18, 2026",
        readTime: "6 min read",
        icon: "🤖"
    },

    {
        id: 6,
        title: "HTML and CSS Tips for Beginners",
        category: "Web Development",
        description: "Useful HTML and CSS tips that every beginner should know.",
        content: "HTML provides the structure of a website while CSS controls its visual appearance. Learning semantic HTML, Flexbox, Grid, responsive design and reusable CSS patterns will help you create professional websites.",
        takeaway: "Master HTML and CSS before jumping into complex frameworks.",
        author: "James Wilson",
        date: "Sep 15, 2026",
        readTime: "4 min read",
        icon: "🎨"
    },

    {
        id: 7,
        title: "How APIs Work in Web Development",
        category: "Web Development",
        description: "Understand how frontend applications communicate with backend servers using APIs.",
        content: "An API allows different software applications to communicate with each other. In modern web applications, the frontend commonly sends HTTP requests to a backend API to retrieve or update data.",
        takeaway: "Understanding HTTP requests is an important full-stack development skill.",
        author: "Daniel Lee",
        date: "Sep 12, 2026",
        readTime: "7 min read",
        icon: "🔗"
    },

    {
        id: 8,
        title: "Why Git and GitHub Are Important",
        category: "Technology",
        description: "Learn why developers use Git and GitHub to manage their source code.",
        content: "Git is a version control system that allows developers to track code changes. GitHub provides an online platform where repositories can be stored, shared and collaborated on with other developers.",
        takeaway: "Every developer should be comfortable with basic Git commands.",
        author: "Olivia Davis",
        date: "Sep 10, 2026",
        readTime: "5 min read",
        icon: "🐙"
    }
];


const blogContainer = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

const modal = document.getElementById("blogModal");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDescription = document.getElementById("modalDescription");
const modalTakeaway = document.getElementById("modalTakeaway");

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const newsletterForm = document.getElementById("newsletterForm");
const toast = document.getElementById("toast");

let selectedCategory = "All";


/* ================= DISPLAY BLOGS ================= */

function displayBlogs(data) {

    blogContainer.innerHTML = "";

    resultCount.textContent = `${data.length} article${data.length !== 1 ? "s" : ""}`;

    if (data.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    data.forEach(blog => {

        const card = document.createElement("article");

        card.className = "blog-card";

        card.innerHTML = `

            <div class="blog-image">
                ${blog.icon}
            </div>

            <div class="blog-content">

                <span class="blog-category">
                    ${blog.category}
                </span>

                <h3 class="blog-title">
                    ${blog.title}
                </h3>

                <p class="blog-description">
                    ${blog.description}
                </p>

                <div class="blog-meta">

                    <span>
                        👤 ${blog.author}
                    </span>

                    <span>
                        ${blog.readTime}
                    </span>

                </div>

                <div class="blog-actions">

                    <button
                        class="read-btn"
                        onclick="openBlog(${blog.id})"
                    >
                        Read More →
                    </button>

                    <button
                        class="like-btn"
                        data-id="${blog.id}"
                    >
                        ♡
                    </button>

                </div>

            </div>
        `;

        blogContainer.appendChild(card);
    });

    document.querySelectorAll(".like-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("liked");

            if (button.classList.contains("liked")) {
                button.textContent = "♥";
            } else {
                button.textContent = "♡";
            }

        });

    });

}


/* ================= FILTER BLOGS ================= */

function filterBlogs() {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredBlogs = blogs.filter(blog => {

        const matchesCategory =
            selectedCategory === "All" ||
            blog.category === selectedCategory;

        const matchesSearch =
            blog.title.toLowerCase().includes(searchText) ||
            blog.description.toLowerCase().includes(searchText) ||
            blog.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayBlogs(filteredBlogs);
}


/* ================= SEARCH ================= */

searchInput.addEventListener("input", filterBlogs);


/* ================= CATEGORY ================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterBlogs();

    });

});


/* ================= OPEN BLOG ================= */

function openBlog(id) {

    const blog = blogs.find(item => item.id === id);

    if (!blog) {
        return;
    }

    modalImage.textContent = blog.icon;

    modalCategory.textContent = blog.category;

    modalTitle.textContent = blog.title;

    modalMeta.textContent =
        `${blog.author} • ${blog.date} • ${blog.readTime}`;

    modalDescription.textContent = blog.content;

    modalTakeaway.textContent = blog.takeaway;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* ================= CLOSE MODAL ================= */

function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* ================= DARK MODE ================= */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

});


document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

    });

});


/* ================= NEWSLETTER ================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("emailInput").value;

    if (email.trim() === "") {
        return;
    }

    toast.classList.add("show");

    newsletterForm.reset();

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

});


/* ================= INITIAL LOAD ================= */

displayBlogs(blogs);
