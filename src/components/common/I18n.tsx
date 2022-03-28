import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import cloneDeep from "lodash/cloneDeep";

interface I18nProps {
  text: string;
  args?: string[] | Record<string, string | number>[];
}

const I18n = (props: I18nProps) => {
  const { args, text } = props;

  let translations: Record<string, Record<string, string>> = {};
  const s_re = /%s/g;
  const pl_re = /{(.*?)}/g;

  const rootState = useSelector((state: RootState) => state);
  const language = rootState.userActions.language || "es";
  const newData = rootState.userActions.data || {};

  const getTranslations = (
    lang: string,
    new_translations: Record<string, string>
  ) => {
    const copyTranslationsState = cloneDeep(translations);

    let lang_translations = copyTranslationsState[lang] || {};
    lang_translations = { ...lang_translations, ...new_translations };
    copyTranslationsState[lang] = lang_translations;
    return copyTranslationsState;
  };

  const printf = (
    tr: string,
    ...args: string[] | Record<string, string | number>[]
  ) => {
    if (args.length === 0) {
      return tr;
    }
    let placeholders_s = false;
    let narg = 0;

    tr = tr.replace(s_re, (_) => {
      placeholders_s = true;
      return args[narg++] as string;
    });
    if (!placeholders_s) {
      const context = args[0] as Record<string, string>;
      if (context) {
        tr = tr.replace(pl_re, (_, m) => {
          return context[m];
        });
      }
    }
    return tr;
  };

  translations = getTranslations(language, newData);

  let lang_translations = translations[language] || {};
  let trans = lang_translations[text];
  if (!trans) trans = text;

  return <span>{printf(trans, ...(args || []))}</span>;
};

export default I18n;
