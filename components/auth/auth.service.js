import jwt from 'jsonwebtoken';

class AuthService {
  constructor(env) {
    this.secret = env.secret
  }

  authorizeAdmin = (req, res, next) => {
    let token;
    try {
      token = req.headers.authorization.split(' ')[1];
    } catch (err) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    if (!token) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    jwt.verify(token, this.secret, (err, userData) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      if (userData.role == 3) {
        req.userData = userData;
        next();
      } else {
        return res.status(403).end();
      }
    })
  }

  authorizeTeacher = (req, res, next) => {
    let token;
    try {
      token = req.headers.authorization.split(' ')[1];
    } catch (err) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    if (!token) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    jwt.verify(token, this.secret, (err, userData) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      if (userData.role == 3 || userData.role == 2) {
        req.userData = userData;
        next();
      } else {
        return res.status(403).end();
      }
    })
  }

  authorizeStudent = (req, res, next) => {
    let token;
    try {
      token = req.headers.authorization.split(' ')[1];
    } catch (err) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    if (!token) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    jwt.verify(token, this.secret, (err, userData) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid token" });
      }
      if (userData.role == 3 || userData.role == 2 || userData.role == 1) {
        req.userData = userData;
        next();
      } else {
        return res.status(403).end();
      }
    })
  }

}

export default AuthService;
