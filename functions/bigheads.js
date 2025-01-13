const React = require("react");
const RDS = require("react-dom/server");
const seedrandom = require("seedrandom");
const express = require("express");
const cors = require("cors");

const {
  BigHead,
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
} = require("@bigheads/core");

function getRandomOptions(rng) {
  function selectRandomKey(object) {
    return Object.keys(object)[Math.floor(rng() * Object.keys(object).length)];
  }

  const skinTone = selectRandomKey(theme.colors.skin);
  const eyes = selectRandomKey(eyesMap);
  const eyebrows = selectRandomKey(eyebrowsMap);
  const mouth = selectRandomKey(mouthsMap);
  const hair = selectRandomKey(hairMap);
  const facialHair = selectRandomKey(facialHairMap);
  const clothing = selectRandomKey(clothingMap);
  const accessory = selectRandomKey(accessoryMap);
  const graphic = selectRandomKey(graphicsMap);
  const hat = selectRandomKey(hatMap);
  const body = selectRandomKey(bodyMap);

  const hairColor = selectRandomKey(theme.colors.hair);
  const clothingColor = selectRandomKey(theme.colors.clothing);
  const circleColor = selectRandomKey(theme.colors.bgColors);
  const lipColor = selectRandomKey(theme.colors.lipColors);
  const hatColor = selectRandomKey(theme.colors.clothing);

  const mask = true;
  const lashes = rng() > 0.5;

  return {
    skinTone,
    eyes,
    eyebrows,
    mouth,
    hair,
    facialHair,
    clothing,
    accessory,
    graphic,
    hat,
    body,
    hairColor,
    clothingColor,
    circleColor,
    lipColor,
    hatColor,
    mask,
    lashes,
  };
}

const app = express();

app.get("/", (req, res) => {
  console.log("Incoming request:", req.url);

  try {
    const { seed, ...props } = req.query;
    const rng = seed ? seedrandom(seed) : Math.random;

    const mergedProps = {
      ...getRandomOptions(rng),
      ...props,
    };

    const avatarString = RDS.renderToString(
      React.createElement(BigHead, mergedProps)
    );

    res.set("Content-Type", "image/svg+xml");
    if (seed) {
      res.set("Cache-Control", "max-age=0, must-revalidate, public");
    }

    res.send(avatarString);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Avatar service running on port ${PORT}`);
});
