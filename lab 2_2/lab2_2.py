import matplotlib.pyplot as plt  # lib for graphs
import numpy as np  # lib for math operations
import math  # lib for math operations

# constants
n = 6  # number of harmonics
w = 2100  # max frequency
N = 1024  # number of descrete calls


# function for calculating random signal
def formula(a, w, t, phi):
    return a*np.sin(w*t+phi)

# function for generation array of signals
def generateSignals(n, w, N):
    signals = [0]*N  # array of signals
    w0 = w/n  # frequency
    for _ in range(n):

        for t in range(N):
            a = np.random.rand()  # amplitude
            phi = np.random.rand()  # phase
            signals[t] += formula(a, w0, t, phi)
        w0 += w0
    return signals

def coeff(pk, N):
    exp = 2*math.pi*pk/N
    return complex(math.cos(exp), -math.sin(exp))

# function for calculating Discrete Fourier Transform
def fft(signals):
    N = len(signals)
    l = int(N/2)
    spectrum = [0] * N

    if N == 1:
        return signals
    evens = fft(signals[::2])
    odds = fft(signals[1::2])

    for k in range(l):
        spectrum[k] = evens[k] + odds[k] * coeff(k, N)
        spectrum[k + l] = evens[k] - odds[k] * coeff(k, N)

    return spectrum

signals = generateSignals(n, w, N)

# plotting

plt.plot(signals)
plt.xlabel('time')
plt.ylabel('x')
plt.title('Random generated signal')
plt.figure()

plt.plot(fft(signals))
plt.xlabel('p')
plt.ylabel('F(p)')
plt.title('Fast Fourier Transform')
plt.show()
