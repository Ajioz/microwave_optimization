from mw_Optimizer import Optimizer, RainFade
from flask import jsonify
from Gaussian import Gaussian as ga

import matplotlib.pyplot as plt
import numpy as np
import scipy as sp
from scipy import stats
import pandas as pd


def search(LTX=3.71, LRX=2.86, ptx=16.0, prx=16.0, gtx=40.5, grx=40.5, rsx=-73.5, freq=12400,):
    '''
        LTX (float) representing the the total system losses in dB at the transmitter
        LRX (float) representing the total system losses in dB at the receiver.
        ptx (floats) represents the transmitter power in dBm.
        prx (floats) represents the receiver power in dBm.
        gtx (floats) represents the transmitter antenna gain in dBi.
        grx (floats) represents the reciever antenna gain in dBi.
        rsx (flaot) represents receiver sensitivity of the antenna
        freg (int) represents the operating frequency of the antenna pair
    '''
    optimization = Optimizer(LTX, LRX, ptx, prx, gtx, grx, rsx, freq)
    rain = RainFade()
    lower_threshold = 1.0
    upper_threshold = 1.5

    step = 0.00
    count = 0

    my_ki = []
    distance = []
    margin = []
    my_fls = []
    my_prx = []

    Avr = []
    Avr_con = []

    FMs = []
    FM_con = []

    while True:

        input_set = optimization.show_input()
        my_los = optimization.los(35, 40)

        ki = optimization.idim_constant(step)
        my_ki.append(ki)

        optimised_distance = optimization.aniebet()
        distance.append(optimised_distance)

        FLS = optimization.free_space_loss()
        my_fls.append(FLS)

        PRx = optimization.received_power()
        my_prx.append(PRx)

        FM = optimization.fade_margin()
        FMs.append(FM)

        verticalPol = rain.specific_attenuation()

        Av = rain.rain_attenuation(optimised_distance)
        Avr.append(Av)

        Av_condition = Av - 30.0
        Avr_con.append(Av_condition)

        FM_condition = FM - 30.0
        FM_con.append(FM_condition)

        result = FM - Av
        margin.append(result)

        if(result > upper_threshold):
            step += 0.0001
            count += 1

        elif(result < lower_threshold):
            step -= 0.0001
            count += 1

        elif(count >= 60):
            break

    return {
        "Z_Inputs": input_set,
        "LoS": my_los,
        "Vertical Polarization": verticalPol,
        "Ki": my_ki,
        "Distance": distance,
        "Margin": margin,
        "FLs": my_fls,
        "PRx": my_prx,
        "AVr": Avr,
        "AVr_Con": Avr_con,
        "FM": FMs,
        "FM_Con": FM_con
    }


def scatter_plot(distance, margin, FM, Av):
    # x-axis values
    x1 = distance
    # y-axis values
    y1 = margin
    y2 = FM
    y3 = Av

    '''# plotting points as a scatter plot
    # plt.scatter(x1, y1, label="FM-Av", color="green", marker="*", s=15)
    # plt.scatter(x1, y2, label="FM", color="blue", marker="o", s=10)
    # plt.scatter(x1, y3, label="AV", color="black", marker="2", s=25)'''
    '''ax = plt.gca()
    ax.set_xlim([3.5, 6.0])
    ax.set_ylim([-6, 50])

    # x-axis label
    plt.ylabel('Margin')

    # frequency label
    plt.xlabel('Optimized distance')

    # plot title
    plt.title('Distance Vs FadeMargin Vs Rain Attenuation')

    # showing legend
    plt.legend(bbox_to_anchor=(1.03, 1), loc='upper left',
                borderaxespad=0, title='Legend')

    # draw gridlines
    plt.grid(True)
    # function to show the plot
    plt.show()'''

    return {"x1": x1, "y1": y1, "y2": y2, "y3": y3}


def guassian_plot(distance):

    sort_dis = sorted(distance)

    x_data = sort_dis
    x_data2 = distance

    mean = ga.mean(x_data)
    mean2 = ga.mean(x_data2)

    std = ga.stdev(x_data)
    std2 = 0.625

    y_data = stats.norm.pdf(x_data, mean, std)
    y_data2 = stats.norm.pdf(x_data2, mean2, std2)
    plt.plot(x_data, y_data)
    plt.plot(x_data2, y_data2)

    return {"x_data": x_data, "y_data": y_data, "x_data2": x_data2, "y_data2": y_data2}

    '''
        # x-axis label
        plt.xlabel('proposed distance')

        # frequency label
        plt.ylabel('Probability Density')

        # plot title
        plt.title('Guassian Estimation')

        # showing legend
        plt.legend()

        # draw gridlines
        plt.grid(True)
        plt.show()
    '''


def compare(distance, margin, FM_con, Av_con):
    # x-axis values
    y1 = margin
    y2 = Av_con
    y3 = FM_con

    # y-axis values
    x1 = distance

    '''# plotting points as a scatter plot
    plt.scatter(x1, y1, label="FM-Av",  color="blue", marker="*", s=15)
    plt.scatter(x1, y2, label="AVr", color="black", marker="o", s=15)
    plt.scatter(x1, y3, label="FM", color="red", marker="1", s=25)

    # x-axis label
    plt.ylabel('Margin')

    # frequency label
    plt.xlabel('Optimized distance')

    # plot title
    plt.title('Distance Vs FadeMargin Vs Rain Attenuation')

    # showing legend
    plt.legend(bbox_to_anchor=(1.03, 1), loc='upper left',
                title='Legend', borderaxespad=0)

    # draw gridlines
    plt.grid(True)

    # function to show the plot
    plt.show()'''

    return {"x1": x1, "y1": y1, "y2": y2, "y3": y3}


def my_write(my_los, ki, distance, FLS, PRx, verticalPol,  margin, FM, Avr):
    data = {
        'Tree': [tree+1 for tree in range(len(ki))],
        'Line-of-Sight[los]': my_los,
        'Idim Constant[Ki]': ki,
        'Optimized Distance[d]': distance,
        'PathLoss[FLSdb]': FLS,
        'Received Power[PRx]': PRx,
        'Fade Margin[FM]': FM,
        'Rain Fading[AVr]': Avr,
        'Vertical Pol[Vp]': [verticalPol for x in range(len(ki))],
        'margin[m]': margin
    }

    df = pd.DataFrame(data)
    df.to_excel('Search.xlsx',
                sheet_name='Optimization Result', index=False)


los, verticalPol, ki, distance, margin, fls, prx, Avr, Avr_con, FM, FM_con = search()

# scatter_plot(distance, margin, FM, Avr)
# guassian_plot(distance)
# compare(distance, margin, FM_con, Avr_con)
# my_write(los, ki, distance, fls, prx, verticalPol,  margin, FM, Avr) '''
