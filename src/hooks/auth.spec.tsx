import { renderHook, act } from "@testing-library/react-hooks"
import { AuthProvider, useAuth } from "./Auth"


describe('Auth Hook', () => {
  it('should be able to sign in with existing google account', async () => {
    const { result } = renderHook(() => useAuth, {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();

  });
});