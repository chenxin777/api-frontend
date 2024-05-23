/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    canAdmin: loginUser?.userRole === 'admin'
  };
}
