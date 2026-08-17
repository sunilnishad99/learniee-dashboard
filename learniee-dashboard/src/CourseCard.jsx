import { Star } from "lucide-react";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-image">
        <span>📚</span>
      </div>

      <div className="course-content">
        <p className="subject">
          {course.subject}
        </p>

        <h3>{course.name}</h3>

        <p>
          Teacher: <b>{course.teacher}</b>
        </p>

        <p>{course.grade}</p>

        <div className="rating">
          <Star size={16} fill="currentColor" />
          {course.rating}
        </div>

        <div className="course-bottom">
          <strong>₹{course.price}</strong>

          <span>
            {course.lessons} lessons
          </span>
        </div>

        <button className="view-btn">
          View Course
        </button>
      </div>
    </div>
  );
}

export default CourseCard;