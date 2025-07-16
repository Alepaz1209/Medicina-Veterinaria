document.addEventListener("DOMContentLoaded", () => {
  const subjects = document.querySelectorAll(".subject");

  function checkUnlocks() {
    subjects.forEach(subject => {
      const prereqs = subject.dataset.prereq;
      if (!prereqs || subject.classList.contains("approved")) {
        subject.classList.remove("locked");
        return;
      }

      const prereqIds = prereqs.split(",");
      const allMet = prereqIds.every(id => {
        const prereq = document.getElementById(id);
        return prereq && prereq.classList.contains("approved");
      });

      if (allMet) {
        subject.classList.remove("locked");
      } else {
        subject.classList.add("locked");
      }
    });
  }

  subjects.forEach(subject => {
    subject.addEventListener("click", () => {
      if (subject.classList.contains("locked")) return;

      subject.classList.toggle("approved");
      checkUnlocks();
    });
  });

  checkUnlocks();
});
