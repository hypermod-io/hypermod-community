import pandas
import json

ids = ["Black", "Blue", "Green", "Purple", "Red", "Yellow"]
prefix = "CUI4 to CUI5 mapping - "
postfix = ".csv"

filenames = [prefix + id + postfix for id in ids]
# filenames.append("foo.csv")

mappings = {}

dont_haves = []

for filename in filenames:
    columns = ["cui4_token", "cui5_token", "_1",
               "cui4_token_rgba", "cui5_token_rgba", "comments"]

    file = pandas.read_csv(
        filename, sep=',', names=columns, skiprows=1, keep_default_na=False)

    assert(len(file.cui4_token) == len(file.cui5_token))
    assert(len(file.cui4_token_rgba) == len(file.cui5_token_rgba))

    for i in range(0, len(file.cui4_token)):
        def prep(from_arr, to_arr_arr, i):
            return (
                from_arr[i].strip(),
                [t.strip() for t in to_arr_arr[i].split("\n")],
                file.comments[i]
            )

        def assign(from_token, to_tokens, c):
            if (len(to_tokens) == 1 and to_tokens[0] == ""):
                to_tokens = []

            mappings[from_token] = {
                "to": to_tokens
            }
            if (len(c)):
                mappings[from_token]["comments"] = c

            if (not len(to_tokens)):
                dont_haves.append(from_token)

        tokens = prep(file.cui4_token, file.cui5_token, i)
        tokens_rgba = prep(file.cui4_token_rgba, file.cui5_token_rgba, i)

        assign(*tokens)  # ...tokens (spread args)
        assign(*tokens_rgba)

outfile = open("mappings.json", "w")
outfile_dont_haves = open("dont_haves.json", "w")

outfile.write(json.dumps(mappings, indent=4))
outfile_dont_haves.write(json.dumps(dont_haves, indent=4))

