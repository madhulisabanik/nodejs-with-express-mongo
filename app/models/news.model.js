module.exports = mongoose => {
    const News = mongoose.model(
        "news",
        mongoose.Schema(
            {
                title: String,
                description: String,
                newsCategory: String,
                url: String,
                urlToImage: String
            },
            {
                timestamps: true
            }
        )
    );

    return News;
};