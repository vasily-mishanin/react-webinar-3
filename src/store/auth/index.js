import StoreModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StoreModule {
  initState() {
    return {
      token: null,
      error: null,
      username: null,
      waiting: false,
    };
  }

  /**
   * Авторизация пользователя
   * @param {*} creds
   *  @return {Promise<void>}
   */
  async logIn(creds) {
    try {
      this.setState({ ...this.getState(), waiting: true });

      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
        body: JSON.stringify(creds),
      });

      const data = await response.json();

      if (data.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          username: null,
          token: null,
          error: data.error,
        });
      } else if (data.result.token) {
        this.setState({
          ...this.getState(),
          waiting: false,
          username: data.result.user.profile.name,
          token: data.result.token,
          error: null,
        });
        localStorage.setItem("auth_token", data.result.token);
      }
    } catch (err) {
      console.error("While getting user", err);
    }
  }

  /**
   * Выход пользователя
   * @param {*} creds
   *  @return {Promise<void>}
   */
  async logOut() {
    const token = localStorage.getItem("auth_token");
    this.setState({
      token: null,
      error: null,
      username: null,
      waiting: false,
    });
    localStorage.removeItem("auth_token");

    try {
      this.setState({ ...this.getState(), waiting: true });

      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
        },
      });

      this.setState({ ...this.getState(), waiting: false });
    } catch (error) {
      console.error("Error deleting user token", error);
    }
  }

  /**
   * Запрос авторизации при входе
   *
   * @return {Promise<void>}
   */
  async getMe(auth_token) {
    this.setState({ ...this.getState(), waiting: true });
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
          "X-Token": auth_token,
        },
      });

      const auth_data = await response.json();

      if (auth_data.error) {
        // Ошибка при загрузке профиля
        this.setState({
          ...this.getState(),
          waiting: false,
          username: null,
          token: null,
          error: auth_data.error,
        });
      } else if (auth_data.result) {
        this.setState({
          ...this.getState(),
          waiting: false,
          username: auth_data.result.profile.name,
          token: auth_token,
          error: null,
        });
      }
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false,
        username: null,
        token: null,
        error: e,
      });
    }
  }

  resetError() {
    this.setState({ ...this.getState(), error: null });
  }
}

export default AuthState;
