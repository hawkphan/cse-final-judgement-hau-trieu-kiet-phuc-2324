import sys
def print_message(input_value):
    if input_value == '1':
        print('Hello World')
    else:
        print(0)
input_value = sys.argv[1]
print_message(input_value)
