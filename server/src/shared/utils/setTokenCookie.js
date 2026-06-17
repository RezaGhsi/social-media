exports.setAccessTokenCookie = (res, token) => {
  res.cookie("access-token", token, {
    maxAge: 1000 * 60,
    httpOnly: true,
    sameSite: true,
    // secure: true,
  });
};

exports.setRefreshTokenCookie = (res, token) => {
  res.cookie("refresh-token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: true,
    // secure: true,
  });
};
