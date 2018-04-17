import translations from '../../../translation';

export const getLangs = () => {
  const langsList = [];

  for (const lang in translations) {
    langsList.push(lang);
  }
  return langsList;
};
