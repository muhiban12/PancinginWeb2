module.exports = (...peranDiizinkan) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(401).json({ error: "User belum terautentik" });
    }

    const rolesUser = Array.isArray(req.user.roles) ? req.user.roles : [req.user.roles];
    const boleh = rolesUser.some(r => peranDiizinkan.includes(r));

    if (!boleh) {
      return res.status(403).json({ error: "Akses ditolak: peran tidak sesuai" });
    }

    next();
  };
};