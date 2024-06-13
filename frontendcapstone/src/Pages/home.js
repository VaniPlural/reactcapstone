import { Navbar } from "../Components/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Carousel from "react-bootstrap/Carousel";
import styles from "../Components/css/home.module.css";

function Home() {
  // let {text1, text2} = props;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Taskio</h1>
      </div>
      <br></br>
      <div className={styles.todoHome}>
      <div className={styles.homeContent}>
        
        <p>
          A Todo app is a productivity tool designed to help users organize and
          manage their tasks effectively. It allows users to create, edit, and
          delete tasks, often with the ability to set due dates and priorities.
          Tasks can be categorized into different lists or projects, enabling
          better organization. Many Todo apps feature reminders and
          notifications to keep users on track with their deadlines.
          Additionally, some apps offer synchronization across multiple devices,
          ensuring tasks are accessible anywhere. Advanced features might
          include collaboration tools, allowing multiple users to share and
          manage task lists together. Overall, a Todo app is essential for
          efficient task management and productivity.
        </p>
      </div>
      <Carousel className="mx-auto w-50">
        <Carousel.Item>
          <img
            src="./todolistApp.png"
            className="d-block w-100"
            alt="Carousel1"
          />
          <Carousel.Caption>
            <p>Welcome!!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="./orangeback.avif"
            className="d-block w-100"
            alt="Carousel1"
          />

          <Carousel.Caption>
            <p>Welcome!!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="./person.avif" className="d-block w-100" alt="Carousel1" />

          <Carousel.Caption>
            <p>Welcome!!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
  );
}
export default Home;
