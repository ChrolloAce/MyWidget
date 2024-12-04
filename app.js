// JavaScript to build the entire app dynamically

// Create and inject styles
const style = document.createElement("style");
style.innerText = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(120deg, #4e73df, #1cc88a);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }

  .dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 90%;
    max-width: 1200px;
  }

  .card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  }

  .button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background-color: #1cc88a;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .button:hover {
    background-color: #17a673;
    transform: scale(1.1);
  }

  header {
    font-size: 2rem;
    margin-bottom: 20px;
    animation: fadeInDown 1s ease-out;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Build HTML Structure
const app = document.createElement("div");

app.innerHTML = `
  <header>Welcome to Your Dashboard</header>
  <div class="dashboard" id="dashboard"></div>
`;

document.body.appendChild(app);

// Dashboard Content Data
const dashboardData = [
  { title: "Sales", value: "$1,200" },
  { title: "Visitors", value: "3,450" },
  { title: "Performance", value: "85%" },
  { title: "Tasks", value: "12 Completed" },
];

// Generate Dashboard Cards
const dashboardElement = document.getElementById("dashboard");

dashboardData.forEach((item) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.value}</p>
    <button class="button">View Details</button>
  `;
  dashboardElement.appendChild(card);
});
