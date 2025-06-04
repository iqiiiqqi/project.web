function showWelcomeMessage() {
  alert("Welcome to Job Board!");
}

window.onload = showWelcomeMessage;

    const jobList = document.getElementById("job-list");
    const jobForm = document.getElementById("jobForm");
    const jobTitle = document.getElementById("jobTitle");
    const jobType = document.getElementById("jobType");
    const btnClass = document.getElementById("btnClass");

    const authForm = document.getElementById("authForm");
    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");
    const signupCheck = document.getElementById("signupCheck");
    const authMessage = document.getElementById("authMessage");

    const modalSoundSrc = "sounds/arrow-whoosh.wav";
    const linkSoundSrc = "sounds/sliding-door.wav";
    const clickSoundSrc = "sounds/click.wav";

    function playSound(src) {
      const sound = new Audio(src);
      sound.play().catch(() => {});
    }

    const defaultJobs = [
      { title: "Web Developer", type: "Full-time | Remote", btnClass: "btn-primary" },
      { title: "Graphic Designer", type: "Full-time | Remote", btnClass: "btn-primary" },
      { title: "Marketing Manager", type: "Full-time | Remote", btnClass: "btn-primary" }
    ];

    let jobs = JSON.parse(localStorage.getItem("jobs")) || defaultJobs.slice();
    let editingIndex = null;

    function renderJobs() {
      if (!jobList) return;
      jobList.innerHTML = "";

      jobs.forEach((job, index) => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("col-md-4", "mb-3");
        jobCard.innerHTML = 
          <div class="card position-relative">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text">${job.type}</p>
              <a href="#" class="btn ${job.btnClass}">Apply Now</a>
              ${index >= defaultJobs.length ? 
                <button class="btn btn-sm btn-warning edit-btn" data-index="${index}" style="position:absolute; top:5px; right:65px;">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-index="${index}" style="position:absolute; top:5px; right:5px;">Delete</button>
               : ''}
            </div>
          </div>
        ;
        jobList.appendChild(jobCard);
      });

      for (let i = 1; i <= 3; i++) {
        const jobCard = document.createElement("div");
        jobCard.classList.add("col-md-4", "mb-3");
        jobCard.innerHTML = 
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Extra Job ${i}</h5>
              <p class="card-text">Internship | On-site</p>
              <a href="#" class="btn btn-secondary">Apply Now</a>
            </div>
          </div>
        ;
        jobList.appendChild(jobCard);
      }
    }

    renderJobs();

    if (jobForm) {
      jobForm.addEventListener("submit", e => {
        e.preventDefault();

        const title = jobTitle.value.trim();
        const type = jobType.value.trim();
        const button = btnClass.value;

        if (!title || !type) {
          alert("Please fill in all job fields.");
          return;
        }

        if (editingIndex !== null) {
          jobs[editingIndex] = { title, type, btnClass: button };
          editingIndex = null;
        } else {
          jobs.push({ title, type, btnClass: button });
        }

        localStorage.setItem("jobs", JSON.stringify(jobs));
        renderJobs();
        jobForm.reset();
        playSound(clickSoundSrc);
      });
    }

    if (jobList) {
      jobList.addEventListener("click", e => {
        const target = e.target;

        if (target.classList.contains("delete-btn")) {
          const index = parseInt(target.dataset.index, 10);
          if (index >= defaultJobs.length) {
            jobs.splice(index, 1);
            localStorage.setItem("jobs", JSON.stringify(jobs));
            renderJobs();
            playSound(clickSoundSrc);
          }
          return;
        }

        if (target.classList.contains("edit-btn")) {
          const index = parseInt(target.dataset.index, 10);
          if (index >= defaultJobs.length) {
            const job = jobs[index];
            jobTitle.value = job.title;
            jobType.value = job.type;
            btnClass.value = job.btnClass;
            editingIndex = index;
            playSound(clickSoundSrc);
          }
          return;
        }

        const card = target.closest(".card");
        if (card && !target.classList.contains("edit-btn") && !target.classList.contains("delete-btn") && !target.classList.contains("btn")) {
          const jobTitleText = card.querySelector(".card-title")?.textContent || "This job";
          alert(${jobTitleText} is now unavailable!);
          playSound(clickSoundSrc);
        }
      });
    }

    if (authForm) {
      authForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = authEmail.value.trim();
        const password = authPassword.value.trim();
        const isSignUp = signupCheck.checked;

        if (!email || !password) {
          authMessage.innerHTML = <div class="alert alert-danger">Please fill in all fields.</div>;
          return;
        }

        localStorage.setItem(email, JSON.stringify([password]));
        authMessage.innerHTML = <div class="alert alert-success">You have successfully ${isSignUp ? "registered" : "logged in"} as <strong>${email}</strong>!</div>;
        authForm.reset();
        playSound(clickSoundSrc);
      });
    }

    const authModal = document.getElementById("authModal");
    if (authModal) {
      authModal.addEventListener("show.bs.modal", () => {
        playSound(modalSoundSrc);
      });
    }

    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        playSound(linkSoundSrc);
      });
    });

    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        playSound(clickSoundSrc);
      });
    });
  });
})();   