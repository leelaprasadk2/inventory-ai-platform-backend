const authorizeRoles =
  (...roles) => {

    return (
      req,
      res,
      next
    ) => {

      // =========================
      // CHECK USER
      // =========================

      if (!req.user) {

        return res.status(401).json({

          message:
            "Unauthorized",
        });
      }

      // =========================
      // CHECK ROLE
      // =========================

      if (

        !roles.includes(
          req.user.role
        )

      ) {

        return res.status(403).json({

          message:
            "Access denied",
        });
      }

      next();
    };
  };

// =========================
// ADMIN ONLY MIDDLEWARE
// =========================

export const adminOnly =
  (
    req,
    res,
    next
  ) => {

    if (

      req.user &&
      req.user.role ===
        "admin"

    ) {

      next();

    } else {

      return res.status(403).json({

        message:
          "Admin access only",
      });
    }
  };

export default authorizeRoles;