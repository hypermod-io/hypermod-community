module.exports = {
    maintainers: ["kiprasmel"],
    target: [],
    description: "Codemods for @pipedrive/convention-ui-react",
    transforms: {
        "5.0.0": require.resolve("./5.0.0/transform"), //
    },
    presets: {},
};
