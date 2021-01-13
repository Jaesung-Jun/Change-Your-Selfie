import matplotlib.pyplot as plt
import numpy as np
import requests 
import struct
import random
import cv2
import os
from PIL import Image
from munch import  Munch


# 01043, 01125, 01543, 01619, 01904, 01916, 32379 
# 02603, 29734, 29879, 30032, 30325, 31841
def munch_server_args(**kwargs):
    server_args = Munch()
    for key, value in kwargs.items():
        setattr(server_args, key, value) 
    
    return server_args

def extension_check(file_name, server_args):
    file_name_lower = file_name.lower()
    possible = any(file_name_lower.endswith(image_extention) for image_extention in server_args.image_extentions)

    return possible

def make_dataset(root_dir, server_args):
    image_dirs = []
    for root, _, files in sorted(os.walk(root_dir)):
        for file_name in sorted(files):
            if extension_check(file_name, server_args):
                image_dir = os.path.join(root, file_name)
                image_dirs.append(image_dir)

    return image_dirs
    
def cal_control_value(server_args, ratio_control_value, style_control_value):
    ratio_control_value += server_args.increasing_control_value
    style_control_value += server_args.increasing_control_value
    if not server_args.control_IN_LN_ratio: ratio_control_value = 0.0
    if not server_args.control_style: style_control_value = 1.0
    return ratio_control_value, style_control_value 

def setting_init_value(server_args):
    if server_args.use_init_control_value:
        ratio_control_value = server_args.init_ratio_control_value
        style_control_value = server_args.init_style_control_value + 1.0
    else:
        ratio_control_value = -1.0
        style_control_value = 0.0
    concat_image_set = None

    return ratio_control_value, style_control_value, concat_image_set

def get_original_image_array(server_args, image_dir, target_dir):
    original_image = Image.open(target_dir if server_args.control_IN_LN_ratio or server_args.control_style or not server_args.multi_inference else image_dir).convert('RGB')
    original_image_array = np.array(original_image, dtype=np.uint8)
    original_image_array = cv2.resize(original_image_array, dsize=(256, 256), interpolation=cv2.INTER_AREA)
    
    return original_image_array

def request_translation(server_args, image_dir, ratio_control_value, style_control_value, target_dir):
    resp = requests.post(f"http://{server_args.ip_address}:{server_args.port}/predict", files={
        "image": open(target_dir if server_args.control_IN_LN_ratio or server_args.control_style or not server_args.multi_inference else image_dir, 'rb'), 
        "ratio_control_value": struct.pack('f', ratio_control_value), 
        "style_control_value": struct.pack('f', style_control_value)})
    translation_image_array = np.array(resp.json()['image'], dtype=np.uint8)

    return translation_image_array

def concat_image(original_image_array, translation_image_array, concat_image_set):
    concat_image = np.concatenate((original_image_array, translation_image_array), axis=0)
    if concat_image_set is not None:
        concat_image_set = np.concatenate((concat_image_set, concat_image), axis=1)
    else:
        concat_image_set = concat_image
    
    return concat_image_set
    
def show_multi_image(concat_image_set):
    height = np.shape(concat_image_set)[1]
    concat_image_set = np.concatenate((concat_image_set[:, :height//2, :], concat_image_set[:, height//2:, :]), axis=0) # separate to 2 rows
    plt.imshow(concat_image_set)
    plt.show()

def reset_value(server_args, image_dir):
    ratio_control_value = server_args.init_ratio_control_value
    style_control_value = server_args.init_style_control_value + 1.0
    target_dir = image_dir
    concat_image_set = None

    return ratio_control_value, style_control_value, target_dir, concat_image_set

def run_image_translation(**kwargs):
    server_args = munch_server_args(**kwargs)

    image_dirs = make_dataset(server_args.root_dir, server_args)
    target_dir = os.path.join(server_args.root_dir, server_args.image_name)
    if server_args.shuffle_images:
        random.shuffle(image_dirs)

    start_iteration(server_args, image_dirs, target_dir)

def start_iteration(server_args, image_dirs, target_dir):
    ratio_control_value, style_control_value, concat_image_set = setting_init_value(server_args)
    for index, image_dir in enumerate(image_dirs):
        original_image_array = get_original_image_array(server_args, image_dir, target_dir)
        translation_image_array = request_translation(server_args, image_dir, ratio_control_value, style_control_value, target_dir)
        # translation_image = Image.fromarray(translation_image_array)

        concat_image_set = concat_image(original_image_array, translation_image_array, concat_image_set)

        if server_args.multi_inference and (index+1) % 20 == 0:
            show_multi_image(concat_image_set)
            ratio_control_value, style_control_value, target_dir, concat_image_set = reset_value(server_args, image_dir)
        
        if not server_args.multi_inference:
            plt.imshow(concat_image_set)
            plt.show()
            ratio_control_value, style_control_value, target_dir, concat_image_set = reset_value(server_args, image_dir)

        ratio_control_value, style_control_value = cal_control_value(server_args, ratio_control_value, style_control_value)



# The range of the ratio_control_value is [-∞, ∞], and the default control value is 0.0
# The range of the style_control_value is [-1, ∞], and the default control value is 0.0
# Increasing_control_value is used when multi_inference is True
# "IN" is the content and "LN" is the style?
run_image_translation(ip_address='192.168.154.29',
                      port='8000',
                      image_extentions=['.jpg', '.jpeg', '.png'],
                      root_dir='./dataset/FFHQ_AnimeFaces256Cleaner/testA/',
                      image_name='01619.png',
                      shuffle_images=True,
                      use_init_control_value=False,
                      init_ratio_control_value=0.0,
                      init_style_control_value=0.0,
                      increasing_control_value=0.1,
                      control_IN_LN_ratio=False,
                      control_style=True,
                      multi_inference=True)