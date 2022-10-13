import { renderHook, act } from "@testing-library/react-hooks"
import { AuthProvider, useAuth } from "./Auth"
import { mocked } from 'ts-jest/utils'
import { logInAsync } from 'expo-google-app-auth'

jest.mock('expo-google-app-auth')

describe('Auth Hook', () => {
  it('should be able to sign in with existing google account', async () => {
    const googleMocked = mocked(logInAsync as any)

    googleMocked.mockedReturnValue({

      type: "success",
      user: {
        id: "any_id",
        email: "lucas@gmail.com",
        name: "Lucas",
        photo: "any_photo.png"
      }
    })

    const { result } = renderHook(() => useAuth, {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('lucas@gmail.com');

  });

  it('user should not connect if cancel authentication with google', async () => {
    const googleMocked = mocked(logInAsync as any)

    googleMocked.mockedReturnValue({
      type: "cancel"
    })

    const { result } = renderHook(() => useAuth, {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).not.toHaveProperty('id')

  });
});