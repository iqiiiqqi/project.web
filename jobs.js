document.addEventListener("DOMContentLoaded", function () {
  const jobs = [
    { title: "Frontend Developer", location: "Remote", type: "Full-Time" },
    { title: "Marketing Specialist", location: "Shymkent", type: "Part-Time" },
    { title: "Data Analyst Intern", location: "Almaty", type: "Internship" },
    { title: "UX Designer", location: "Karagandy", type: "Full-Time" },
    { title: "Backend Engineer", location: "Remote", type: "Remote" },
    { title: "Product Manager", location: "Astana", type: "Full-Time" },
    { title: "QA Tester", location: "Remote", type: "Part-Time" },
    { title: "AI Research Intern", location: "Almaty", type: "Internship" }
  ];

  const jobList = document.getElementById("jobList");
  const jobFilter = document.getElementById("jobFilter");
  const searchInput = document.getElementById("searchInput");

  function displayJobs(filterType, keyword) {
    jobList.innerHTML = "";

    let filteredJobs = jobs;

    if (filterType !== "All") {
      filteredJobs = filteredJobs.filter(job => job.type === filterType);
    }

    if (keyword.trim() !== "") {
      const lowerKeyword = keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.title.toLowerCase().includes(lowerKeyword));
    }

    if (filteredJobs.length === 0) {
      jobList.innerHTML = `<div class="col text-center"><p class="text-muted">No jobs found for your search.</p></div>`;
      return;
    }

    filteredJobs.forEach(job => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
        <div class="card job-card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            
            <span class="badge text-bg-primary badge-job">${job.type}</span>
          </div>
          <div class="card-footer bg-transparent border-0 text-end">
            <a href="#" class="btn btn-outline-success">Apply Now</a>
          </div>
        </div>
      `;

      jobList.appendChild(col);
    });
  }

  displayJobs("All", "");

  jobFilter.addEventListener("change", () => {
    displayJobs(jobFilter.value, searchInput.value);
  });

  searchInput.addEventListener("input", () => {
    displayJobs(jobFilter.value, searchInput.value);
  });
  
function calculateSalary() {
  const rate = parseFloat(document.getElementById("hourlyRate").value);
  const hours = parseFloat(document.getElementById("hoursPerWeek").value);
  const weeks = parseFloat(document.getElementById("weeksPerYear").value);

  const result = document.getElementById("salaryResult");

  if (isNaN(rate) || isNaN(hours) || isNaN(weeks)) {
    result.textContent = "❗ Please fill in all fields with valid numbers.";
    result.style.color = "red";
    return;
  }

  const annual = rate * hours * weeks;
  const monthly = annual / 12;

  result.style.color = "green";
  result.textContent = `Estimated Salary: $${annual.toFixed(2)} per year | $${monthly.toFixed(2)} per month.`;
}

});
