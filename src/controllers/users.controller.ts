import Controller from './controller.js';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';
import { addToBackpack, BackpackItem } from '../models/game.model.js';

interface SignupBody {
  name: string;
  password: string;
  password_confirm: string;
  email: string;
}

interface LoginBody {
  username: string;
  password: string;
}

const indexController: Controller = {
  getLogin(req, res) {
    res.render("users/login");
  },
  getSignup(req, res) {
    res.render("users/signup");
  },

  async login(req, res) {
    const error = (error) => res.render("users/login", { error });
    const { username, password } = req.body as LoginBody;
    if (!username || !password) {
      return error("Missing fields");
    }

    const user = await UserModel.findOne({ name: username }).populate(
      "currentGame"
    );
    if (!user) {
      return error("Unknown user");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return error("Incorrect password");
    }

    req.session.user = user.toObject();
    res.redirect("/areas/town");
  },

  logout(req, res) {
    req.session.user = undefined;
    res.redirect("/");
  },

  async signup(req, res) {
    const error = (error) => res.render("users/signup", { error });
    const { name, password, password_confirm, email } = req.body as SignupBody;
    if (!name || !password || !password_confirm || !email) {
      return error("Missing fields");
    }
    if (password !== password_confirm) {
      return error("Passwords don't match");
    }

    const hash = await bcrypt.hash(password!, 10);

    const model = new UserModel({
      name,
      password: hash,
      email,
      currentGame: null,
    });
    await model.save();
    req.session.user = model;

    res.redirect("/start");
  },

  backPackContents(req, res) {
    res.send(req.session.user?.currentGame?.backpack);
  },

  async backPackAdd(req, res) {
    if (req.session.user?.currentGame?.backpack.includes(req.params.item as BackpackItem)) {
      res.status(204).send();
    }

    req.session.user?.currentGame?.backpack.push(
      req.params.item as BackpackItem
    );

    await addToBackpack(
      req.session.user!.currentGame!._id,
      req.params.item as BackpackItem
    );
    res.status(204).send();
  },
};

export default indexController;
