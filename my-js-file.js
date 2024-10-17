

const Task_Container = document.querySelector(".task_container");
let globalStore = []; // array of objects

// Function to generate new card HTML
const generateNewCard = (taskData) => {
  return `
    <div class="col-sm-12 col-lg-4 col-md-6" id="${taskData.id}">
      <div class="card task_container shadow">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-primary" onclick="editTask('${taskData.id}')">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger hover" onclick="deleteTask('${taskData.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="card-body">
          <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
          <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDescription}</p>
          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
      </div>
    </div>
  `;
};

// Function to load initial card data from localStorage
const loadInitialCardData = () => {
  const getCardData = localStorage.getItem("tasky");
  if (getCardData) {
    const { cards } = JSON.parse(getCardData);
    cards.map((cardObject) => {
      Task_Container.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
      globalStore.push(cardObject);
    });
  }
};

// Function to save a new task
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // Unique ID
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };

  Task_Container.insertAdjacentHTML("beforeend", generateNewCard(taskData));
  globalStore.push(taskData);
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
};

// Function to delete a task
const deleteTask = (taskId) => {
  const updatedStore = globalStore.filter(task => task.id !== taskId);
  localStorage.setItem("tasky", JSON.stringify({ cards: updatedStore }));

  const taskElement = document.getElementById(taskId);
  if (taskElement) {
    taskElement.remove(); // Remove from DOM
  }

  globalStore = updatedStore; // Update globalStore
};

// Load initial data on page load
// window.onload = loadInitialCardData;
