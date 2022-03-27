
import store from "../store";
import isEmpty  from 'lodash/isEmpty'

let translations: Record<string, Record<string, string>> = {}
const s_re = /%s/g
const pl_re = /{(.*?)}/g

  /**
 * @short Formats a string using %s and {name} placeholders
 */
export function printf(
    tr: string,
    ...args: string[] | Record<string, string | number>[]
  ) {
    // Do replacements
    if (args.length === 0) {
      return tr
    }
    let placeholders_s = false
    let narg = 0
  
    tr = tr.replace(s_re, (_) => {
      placeholders_s = true
      return args[narg++] as string
    })
    if (!placeholders_s) {
      const context = args[0] as Record<string, string>
      if (context) {
        tr = tr.replace(pl_re, (_, m) => {
          return context[m]
        })
      }
    }
    return tr
  }


  /**
 * @short Translates a string, with maybe some internal data as {1} {2} or {name} {surname}
 */
 export function i18n(
    text: string,
    ...args: string[] | Record<string, string | number>[]
  ): string {
    let lang_translations = translations[store.getState().userActions.language] || {}
    let trans = lang_translations[text]
    if (!trans) trans = text
    return printf(trans, ...args)
  }


  export function setTranslations(
    lang: string,
    new_translations: Record<string, string>
  ) {


    let lang_translations = translations[lang] || {}
    lang_translations = { ...lang_translations, ...new_translations }
    translations[lang] = lang_translations
  }
  
  export function setLanguage(language: string) {
    
    const data = store.getState().userActions?.data

    if(!isEmpty(data)){
      setTranslations(language, data)
    }
    // }else{
    //   const location = window.location;
    //   const url = `${location.protocol}//${location.host}/assets/lang/${language}.json`;
      
    //   axios.get(url).then(request=>{
    //     setTranslations(language, request.data.data)
    //     store.dispatch(changeLanguageRequest(DEFAULT_LANGUAGE))
        
    //   }).catch((_e)=>{
    //     const data: UserActionsState = {
    //       data: {},
    //       language: DEFAULT_LANGUAGE ,
    //       message: "error",
    //     };      
    //     store.dispatch(changeLanguageFail(data))
    //   })

    // }
    // }else{
    //   store.dispatch(changeLanguageRequest(DEFAULT_LANGUAGE))
    // }

  }