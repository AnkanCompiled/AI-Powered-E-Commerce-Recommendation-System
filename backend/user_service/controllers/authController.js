import {
  registerService,
  loginService,
  roleService,
} from "../services/authService.js";

export async function registerController(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const token = await registerService(name, email, password);
    res
      .cookie("authToken", token, {
        httpOnly: true,
        //secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res
      .cookie("authToken", token, {
        httpOnly: true,
        //secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
}

export async function roleController(req, res, next) {
  try {
    const { id } = req.params;
    const role = await roleService(id);
    res.status(200).json({ role: role });
  } catch (error) {
    next(error);
  }
}
