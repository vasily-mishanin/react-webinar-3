import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ user, labels }) {
  const cn = bem("UserCard");
  return (
    <article className={cn()}>
      <h2 className={cn("title")}>{labels.profile}</h2>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          {labels.name}:
          <span className={cn("value")}>
            {user.profile?.name ? user.profile.name : ""}
          </span>
        </p>
      </div>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          {labels.phone}:
          <span className={cn("value")}>
            {user.profile?.phone ? user.profile.phone : ""}
          </span>
        </p>
      </div>
      <div className={cn("prop")}>
        <p className={cn("label")}>
          email:
          <span className={cn("value")}>{user?.email ? user.email : ""}</span>
        </p>
      </div>
    </article>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  user: {},
  t: (text) => text,
};

export default memo(ProfileCard);
