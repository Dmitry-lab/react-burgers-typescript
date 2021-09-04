type TCookieProps = {
  [expires: string]: Date | string | number;
};

export const setCookie = (name: string, value: string, props: TCookieProps & {} | undefined) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && typeof exp != 'number' && typeof exp != 'string') {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    updatedCookie += '=' + propValue;
  }
  document.cookie = updatedCookie;
}

export const getCookie = (name: string): string|undefined => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getToken = (fullString: string): string => {
  return fullString.replace(/Bearer\s+/g, '')
}
