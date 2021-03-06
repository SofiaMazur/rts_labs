import matplotlib.pyplot as plt  # lib for graphs
import numpy as np  # lib for math operations

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
        a = np.random.rand()  # amplitude
        phi = np.random.rand()  # phase

        for t in range(N):
            signals[t] += formula(a, w0, t, phi)
        w0 += w0
    return signals

# correlation function
# combine corr and autocorr methods by using default argument and if/else
def correlation(signal1, signal2=None):

    Mx1 = np.average(signal1)  # math expectation
    sd1 = np.std(signal1)  # standart deviation == sqrt(dispersion)
    length = len(signal1) // 2
    res = []
    
    if signal2 is None:
        signal2 = signal1
        Mx2 = Mx1  # math expectation
        sd2 = sd1  # standart deviation == sqrt(dispersion)
    else:
        Mx2 = np.average(signal2)  # math expectation
        sd2 = np.std(signal2)  # standart deviation == sqrt(dispersion)

    for t in range(length):
        covarience = 0

        for l in range(length):
            covarience += (signal1[l]-Mx1)*(signal2[l + t]-Mx2) / (length-1)

        res.append((covarience / sd1 * sd2))

    return res


signals = generateSignals(n, w, N)
signals_copy = generateSignals(n, w, N)

print('Mx:', np.average(signals))  # Average
print('Dx:', np.var(signals))  # Dispersion

# plotting

plt.plot(signals)
plt.plot(signals_copy)
plt.xlabel('time')
plt.ylabel('x')
plt.title('Random generated signals 1, 2')
plt.figure()

plt.plot(correlation(signals, signals_copy)) # call function with two arguments
plt.xlabel('time')
plt.ylabel('correlation')
plt.title('cross-correlation')
plt.figure()

plt.plot(correlation(signals))  # call function with one argument
plt.xlabel('time')
plt.ylabel('correlation')
plt.title('autocorrelation')
plt.show()
