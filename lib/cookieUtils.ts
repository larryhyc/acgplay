import { cookies } from 'next/headers';

/**
 * 获取当前浏览器的 cookies
 * @param cookieName - cookies 的名称
 */
export const getCookies = async (cookieName: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName);
};

/**
 * 传入参数设置 cookies
 * @param cookieName - cookies 的名称
 * @param cookieValue - cookies 的值
 * @param time - cookies 的过期时间，单位为秒
 */
export const setCookies = async (
  cookieName: string,
  cookieValue: string,
  time: number,
) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: cookieValue,
    maxAge: time,
    httpOnly: true,
  });
};

/**
 * 检查cookies是否存在
 * @param cookieName - cookies 的名称
 */
export const isCookies = async (cookieName: string) => {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has(cookieName);
  return hasCookie;
};

/**
 * 删除 cookies
 * @param cookieName - cookies 的名称
 */
export const deleteCookies = async (cookieName: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
};
