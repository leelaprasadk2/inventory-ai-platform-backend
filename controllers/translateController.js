import { translate } from "@vitalets/google-translate-api";

export const translateCampaign = async (
  req,
  res
) => {

  try {

    const {
      text,
      language
    } = req.body;

    const result =
      await translate(
        text,
        {
          to: language
        }
      );

    res.status(200).json({

      translatedText:
        result.text
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Translation failed"
    });
  }
};