a = [[8, 4], [90, -1, 3], [9, 62], [-7, -1, -56, -6], [201], [76, 18]]

# loop thru first arr
# loop thru arrays inside of main
#lowest = 0

for i in a:
    lowest = i[0]
    adds = 0
    for j in i:
        if lowest > j:
            lowest = j
            adds += lowest
    print(adds)
