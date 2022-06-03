module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '10': "0.714rem",
        '12': "0.857rem",
        '13': "0.928rem",
        '14': "1rem",
        '16': "1.142rem",
        '18': "1.285rem",
        '20': "1.428rem",
        '22': "1.571rem",
        '32': "2.285rem"
      },
      spacing: {
        5: "5px",
        8: "8px",
        10: "10px",
        15: "15px",
        16: "16px",
        20: "20px",
        25: "25px",
        30: "30px",
        40:"40px"
      }
    },
    colors: {
      'light': "#aaaaaa",
      'yellow':"#ffc107",
      "dark":"#37383e",
      "white":"#fff"
      
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}