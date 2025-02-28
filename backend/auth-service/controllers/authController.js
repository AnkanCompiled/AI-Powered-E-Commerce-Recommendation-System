import { registerService, loginService } from "../services/authService.js";

export async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    const token = await registerService(name, email, password);
    res
      .cookie("authToken", token, { httpOnly: true })
      .json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res
      .cookie("authToken", token, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
}
