import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserCard({ user, t }) {
  const cn = bem("UserCard");
  return (
    <article className={cn()}>
      <h2 className={cn("title")}>Профиль</h2>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          Имя:<span className={cn("value")}>{user.name}</span>
        </p>
      </div>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          Телефон:<span className={cn("value")}>{user.phone}</span>
        </p>
      </div>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          email:<span className={cn("value")}>{user.email}</span>
        </p>
      </div>
    </article>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

UserCard.defaultProps = {
  user: {},
  t: (text) => text,
};

export default memo(UserCard);
