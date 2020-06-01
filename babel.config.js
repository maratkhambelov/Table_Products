module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  module: {
    rules: [
      // это правило будет применяться к обычным файлам `.scss`
      // А ТАКЖЕ к секциям `<style lang="scss">` в файлах `.vue`
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
}
