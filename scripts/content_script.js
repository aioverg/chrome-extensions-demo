// 图标
const icon = {
  close1: `
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2910_1002)" filter="url(#filter0_d_2910_1002)">
        <g filter="url(#filter1_d_2910_1002)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.667 18.9998C10.667 14.3974 14.3978 10.6665 19.0003 10.6665C23.6028 10.6665 27.3337 14.3974 27.3337 18.9998C27.3337 23.6023 23.6028 27.3332 19.0003 27.3332C14.3978 27.3332 10.667 23.6023 10.667 18.9998Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.667 18.9998C10.667 14.3974 14.3978 10.6665 19.0003 10.6665C23.6028 10.6665 27.3337 14.3974 27.3337 18.9998C27.3337 23.6023 23.6028 27.3332 19.0003 27.3332C14.3978 27.3332 10.667 23.6023 10.667 18.9998Z" stroke="#D2D5DA" stroke-width="0.5"/>
        </g>
        <path d="M21.3576 16.6431L16.6436 21.3571L21.3576 16.6431Z" stroke="#6C757D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.6436 16.6431L21.3576 21.3571L16.6436 16.6431Z" stroke="#6C757D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <filter width="39.2" height="39.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="4.8"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2910_1002"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2910_1002" result="shape"/>
        </filter>
        <filter x="7.41699" y="7.4165" width="23.167" height="23.1665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2910_1002"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2910_1002" result="shape"/>
        </filter>
        <clipPath>
          <rect width="20" height="20" fill="white" transform="translate(9 9)"/>
        </clipPath>
      </defs>
    </svg>
  `,
  colse2: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 15L5 5M15 5L5 15" stroke="#343A40" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  arrow: `
    <svg width="8" height="36" viewBox="0 0 8 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2910_1003)">
        <path d="M6.16893 18.1843L6.36997 18L6.16893 17.8157L0.168931 12.3157L-0.25 11.9317L-0.25 12.5L-0.25 23.5L-0.250001 24.0683L0.168931 23.6843L6.16893 18.1843Z" fill="white" stroke="#D2D5DA" stroke-width="0.5"/>
      </g>
      <defs>
        <clipPath>
          <rect width="35" height="8" fill="white" transform="translate(0 35.5) rotate(-90)"/>
        </clipPath>
      </defs>
    </svg>
  `,
  warehouse: `
    <svg width="60" height="85" viewBox="0 0 60 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask fill="white">
        <path d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5H48C54.6274 0.5 60 5.87258 60 12.5V84.5H0V12.5Z"/>
      </mask>
      <path d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5H48C54.6274 0.5 60 5.87258 60 12.5V84.5H0V12.5Z" fill="white"/>
      <path d="M0 0.5H60H0ZM60 85H0V84H60V85ZM0 84.5V0.5V84.5ZM60 0.5V84.5V0.5Z" fill="#E2E6EA" mask="url(#path-1-inside-1_2884_4228)"/>
      <path d="M28.705 15.1139C29.1224 14.9145 29.579 14.811 30.0415 14.811C30.5041 14.811 30.9607 14.9145 31.378 15.1139L38.239 18.4079C38.6972 18.6184 39.0862 18.9544 39.361 19.3771C39.6358 19.7998 39.7851 20.2918 39.7915 20.7959V28.3259C39.7915 29.3354 39.214 30.2429 38.239 30.7139L31.414 34.0079C30.9968 34.2075 30.5401 34.311 30.0775 34.3109C29.608 34.3109 29.1385 34.2104 28.7425 34.0079L21.8425 30.6794C20.9035 30.2099 20.29 29.3009 20.29 28.2929V20.7959C20.29 19.7864 20.905 18.8459 21.8425 18.4409L28.7035 15.1139H28.705ZM24.0145 21.7739V25.4489C24.0145 25.7549 24.1645 26.0249 24.4225 26.1764L25.51 26.7344C25.5085 26.7464 25.57 26.7704 25.6405 26.7824C25.6758 26.7873 25.7114 26.7893 25.747 26.7884C26.0785 26.7884 26.317 26.5664 26.317 26.2574V23.0354L26.203 22.8614L24.0145 21.7739ZM30.0415 16.1219C29.824 16.1219 29.6065 16.1894 29.3905 16.2899L22.5295 19.6199C22.4229 19.6545 22.3247 19.7112 22.2415 19.7864L30.0415 23.4854L37.8415 19.7204C37.7335 19.6529 37.6615 19.5854 37.552 19.5509L30.691 16.2569C30.4884 16.1606 30.2657 16.1144 30.0415 16.1219Z" fill="#5E6999"/>
      <path d="M22.248 47.424V48.552C21.912 48.732 21.564 48.9 21.228 49.056V52.44C21.228 53.232 20.844 53.64 20.076 53.64H19.08L18.816 52.536C19.116 52.572 19.404 52.596 19.68 52.596C19.98 52.596 20.136 52.44 20.136 52.152V49.524C19.668 49.692 19.2 49.86 18.732 50.016L18.456 48.924C19.02 48.792 19.584 48.624 20.136 48.408V45.864H18.588V44.784H20.136V42.708H21.228V44.784H22.356V45.864H21.228V47.952C21.564 47.784 21.912 47.616 22.248 47.424ZM28.176 44.304L29.136 44.556C28.848 45.492 28.488 46.308 28.056 47.016L27.132 46.68C27.528 46.056 27.876 45.264 28.176 44.304ZM25.992 44.58C26.256 45.204 26.472 45.78 26.628 46.308L25.704 46.656C25.512 46.032 25.284 45.432 25.02 44.844L25.992 44.58ZM23.712 44.724C24.072 45.348 24.384 46.068 24.66 46.884L23.724 47.112C23.472 46.392 23.16 45.696 22.788 45.024L23.712 44.724ZM28.644 42.684L29.184 43.62C27.564 44.112 25.416 44.364 22.728 44.364L22.392 43.344C24.864 43.344 26.952 43.116 28.644 42.684ZM22.56 48.132H25.284V46.932H26.376V48.132H29.16V49.224H27.108C27.624 50.232 28.452 51.132 29.592 51.936L28.836 52.884C27.708 51.876 26.892 50.748 26.376 49.524V53.7H25.284V49.536C24.72 50.928 23.844 52.092 22.668 53.028L22.056 52.008C23.16 51.264 23.988 50.34 24.516 49.224H22.56V48.132ZM34.164 50.916H30.792V49.872H35.472V49.392H36.6V49.872H41.208V50.916H37.92C38.712 51.54 39.852 52.044 41.352 52.428L40.86 53.436C38.952 52.788 37.584 51.948 36.756 50.916H36.6V53.748H35.472V50.916H35.316C34.56 51.9 33.204 52.764 31.26 53.484L30.66 52.512C32.292 52.032 33.468 51.492 34.164 50.916ZM31.884 45.936C31.644 46.2 31.38 46.464 31.104 46.728L30.444 45.864C31.452 44.952 32.208 43.86 32.712 42.612L33.78 42.852C33.672 43.14 33.552 43.428 33.42 43.692H35.724C35.568 43.356 35.4 43.044 35.22 42.756L36.384 42.564C36.54 42.9 36.696 43.272 36.852 43.692H40.632V44.628H36.912V45.24H40.152V46.104H36.912V46.692H40.152V47.556H36.912V48.192H40.86V49.14H31.884V45.936ZM35.796 48.192V47.556H32.94V48.192H35.796ZM35.796 46.692V46.104H32.94V46.692H35.796ZM35.796 45.24V44.628H32.94V45.24H35.796ZM15.648 65.26C15.42 65.416 15.192 65.572 14.952 65.716L14.244 64.804V69.652H13.152V61.864H15.648C15.48 61.432 15.3 61.012 15.084 60.628H12.648V59.536H17.364C17.256 59.248 17.136 58.972 17.016 58.732L18.276 58.54C18.396 58.84 18.504 59.176 18.624 59.536H23.352V60.628H20.832C20.64 61.084 20.448 61.492 20.244 61.864H22.824V68.296C22.824 69.208 22.428 69.676 21.648 69.676H20.424L20.136 68.644L21.288 68.68C21.576 68.68 21.732 68.464 21.732 68.056V62.872H14.244V64.756C15.204 64.228 15.996 63.604 16.644 62.896L17.448 63.604C16.956 64.18 16.392 64.708 15.756 65.176H20.34V68.344H15.648V65.26ZM19.236 67.336V66.196H16.752V67.336H19.236ZM19.272 62.884C20.232 63.544 21.048 64.204 21.708 64.852L20.856 65.692C20.304 65.044 19.512 64.36 18.504 63.616L19.272 62.884ZM16.812 61.864H18.996C19.212 61.456 19.404 61.048 19.584 60.628H16.332C16.5 61 16.668 61.408 16.812 61.864ZM26.592 59.068H33.408V63.256H26.592V59.068ZM32.268 62.176V60.148H27.732V62.176H32.268ZM29.424 64.156V69.556H28.32V68.98H26.1V69.556H24.984V64.156H29.424ZM26.1 67.912H28.32V65.236H26.1V67.912ZM35.016 64.156V69.556H33.876V68.98H31.56V69.556H30.444V64.156H35.016ZM31.56 67.912H33.876V65.236H31.56V67.912ZM38.952 61.42H42.432V60.832H43.536V61.42H47.016V62.368H43.536V62.896H46.512V66.82H43.536V67.408H47.388V68.392H43.536V69.736H42.432V68.392H38.58V67.408H42.432V66.82H39.408V62.896H42.432V62.368H38.952V61.42ZM45.468 65.956V65.272H43.512V65.956H45.468ZM42.456 65.956V65.272H40.464V65.956H42.456ZM40.464 64.456H42.456V63.76H40.464V64.456ZM43.512 63.76V64.456H45.468V63.76H43.512ZM42.864 58.576C43.008 58.876 43.152 59.212 43.296 59.584H47.304V60.592H38.472V63.388C38.436 65.992 38.064 68.068 37.368 69.628L36.504 68.86C37.068 67.54 37.368 65.716 37.392 63.388V59.584H42.12C42 59.296 41.868 59.02 41.724 58.768L42.864 58.576Z" fill="#343A40"/>
    </svg>
  `,
  collect: `
    <svg width="60" height="85" viewBox="0 0 60 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="84" transform="translate(0 0.5)" fill="white"/>
      <path d="M39.0681 25.5076V29.1054C39.0681 31.0702 37.3987 32.6117 35.3675 32.6998L35.1818 32.7041H31.2955V30.1133H35.1818C35.8848 30.1133 36.4125 29.6815 36.4712 29.1979L36.4772 29.1054V25.5076H39.0681ZM28.7047 16.2954V18.8863H24.8184C24.1154 18.8863 23.5878 19.3181 23.529 19.8017L23.523 19.8941V23.4919H20.9321V19.8941C20.9321 17.9294 22.6015 16.3878 24.6327 16.2997L24.8184 16.2954H28.7047Z" fill="#5E6999"/>
      <path d="M31.7275 18.8863C31.7275 19.917 32.137 20.9055 32.8658 21.6343C33.5946 22.3631 34.5831 22.7726 35.6138 22.7726C36.6445 22.7726 37.633 22.3631 38.3618 21.6343C39.0906 20.9055 39.5001 19.917 39.5001 18.8863C39.5001 17.8556 39.0906 16.8671 38.3618 16.1383C37.633 15.4094 36.6445 15 35.6138 15C34.5831 15 33.5946 15.4094 32.8658 16.1383C32.137 16.8671 31.7275 17.8556 31.7275 18.8863Z" fill="#5E6999"/>
      <path d="M20.5 30.1138C20.5 30.6242 20.6005 31.1295 20.7958 31.601C20.9911 32.0725 21.2774 32.501 21.6383 32.8618C21.9991 33.2227 22.4276 33.509 22.8991 33.7043C23.3706 33.8996 23.8759 34.0001 24.3863 34.0001C24.8966 34.0001 25.402 33.8996 25.8735 33.7043C26.345 33.509 26.7734 33.2227 27.1343 32.8618C27.4952 32.501 27.7814 32.0725 27.9767 31.601C28.172 31.1295 28.2726 30.6242 28.2726 30.1138C28.2726 29.0831 27.8631 28.0946 27.1343 27.3658C26.4055 26.637 25.417 26.2275 24.3863 26.2275C23.3556 26.2275 22.3671 26.637 21.6383 27.3658C20.9094 28.0946 20.5 29.0831 20.5 30.1138Z" fill="#5E6999"/>
      <path d="M20.7 49.704H22.188V48.564H21.012V47.604H26.856V48.564H25.788V49.704H27.228V50.7H25.788V53.4H24.756V50.7H23.148C23.064 51.324 22.92 51.84 22.704 52.26C22.404 52.836 21.912 53.28 21.24 53.592L20.676 52.704C21.252 52.416 21.636 52.044 21.852 51.6C21.96 51.336 22.044 51.036 22.104 50.7H20.7V49.704ZM24.756 49.704V48.564H23.208V49.704H24.756ZM20.064 45.336V46.008H22.464V45.336H20.064ZM22.464 44.556V43.836H20.064V44.556H22.464ZM25.452 45.336V45.984H27.912V45.336H25.452ZM27.912 44.556V43.86H25.452V44.556H27.912ZM23.58 42.96V46.896H20.064V53.628H18.936V42.96H23.58ZM27.912 46.872H24.336V42.96H29.052V52.296C29.052 53.148 28.644 53.58 27.828 53.58C27.408 53.58 26.988 53.568 26.556 53.544L26.292 52.536C26.7 52.572 27.072 52.596 27.42 52.596C27.744 52.596 27.912 52.38 27.912 51.948V46.872ZM31.836 42.588L32.952 42.684C32.856 43.452 32.76 44.184 32.664 44.856H34.368V45.492C34.296 47.412 33.984 49.068 33.432 50.484C33.96 51.036 34.404 51.54 34.74 51.984L33.972 52.884C33.672 52.476 33.324 52.056 32.916 51.6C32.46 52.44 31.896 53.172 31.224 53.796L30.504 52.896C31.176 52.296 31.716 51.576 32.136 50.76C31.668 50.28 31.164 49.776 30.612 49.248C30.876 48.24 31.128 47.136 31.344 45.948H30.504V44.856H31.524C31.632 44.124 31.74 43.368 31.836 42.588ZM32.616 49.656C33 48.564 33.24 47.328 33.312 45.948H32.484C32.28 47.124 32.064 48.12 31.836 48.912C32.112 49.176 32.376 49.416 32.616 49.656ZM40.68 48.48V53.748H39.588V53.076H36.3V53.748H35.22V48.48H40.68ZM36.3 52.008H39.588V49.524H36.3V52.008ZM34.812 47.604L34.632 46.572C35.22 46.38 36.048 45.072 37.116 42.636L38.196 42.996C37.548 44.388 36.9 45.564 36.228 46.5C37.38 46.428 38.496 46.308 39.576 46.14C39.288 45.54 38.988 44.988 38.7 44.472L39.672 44.004C40.296 45.048 40.872 46.2 41.424 47.46L40.38 47.964C40.26 47.652 40.14 47.364 40.02 47.1C38.46 47.316 36.72 47.484 34.812 47.604ZM22.248 63.424V64.552C21.912 64.732 21.564 64.9 21.228 65.056V68.44C21.228 69.232 20.844 69.64 20.076 69.64H19.08L18.816 68.536C19.116 68.572 19.404 68.596 19.68 68.596C19.98 68.596 20.136 68.44 20.136 68.152V65.524C19.668 65.692 19.2 65.86 18.732 66.016L18.456 64.924C19.02 64.792 19.584 64.624 20.136 64.408V61.864H18.588V60.784H20.136V58.708H21.228V60.784H22.356V61.864H21.228V63.952C21.564 63.784 21.912 63.616 22.248 63.424ZM28.176 60.304L29.136 60.556C28.848 61.492 28.488 62.308 28.056 63.016L27.132 62.68C27.528 62.056 27.876 61.264 28.176 60.304ZM25.992 60.58C26.256 61.204 26.472 61.78 26.628 62.308L25.704 62.656C25.512 62.032 25.284 61.432 25.02 60.844L25.992 60.58ZM23.712 60.724C24.072 61.348 24.384 62.068 24.66 62.884L23.724 63.112C23.472 62.392 23.16 61.696 22.788 61.024L23.712 60.724ZM28.644 58.684L29.184 59.62C27.564 60.112 25.416 60.364 22.728 60.364L22.392 59.344C24.864 59.344 26.952 59.116 28.644 58.684ZM22.56 64.132H25.284V62.932H26.376V64.132H29.16V65.224H27.108C27.624 66.232 28.452 67.132 29.592 67.936L28.836 68.884C27.708 67.876 26.892 66.748 26.376 65.524V69.7H25.284V65.536C24.72 66.928 23.844 68.092 22.668 69.028L22.056 68.008C23.16 67.264 23.988 66.34 24.516 65.224H22.56V64.132ZM34.164 66.916H30.792V65.872H35.472V65.392H36.6V65.872H41.208V66.916H37.92C38.712 67.54 39.852 68.044 41.352 68.428L40.86 69.436C38.952 68.788 37.584 67.948 36.756 66.916H36.6V69.748H35.472V66.916H35.316C34.56 67.9 33.204 68.764 31.26 69.484L30.66 68.512C32.292 68.032 33.468 67.492 34.164 66.916ZM31.884 61.936C31.644 62.2 31.38 62.464 31.104 62.728L30.444 61.864C31.452 60.952 32.208 59.86 32.712 58.612L33.78 58.852C33.672 59.14 33.552 59.428 33.42 59.692H35.724C35.568 59.356 35.4 59.044 35.22 58.756L36.384 58.564C36.54 58.9 36.696 59.272 36.852 59.692H40.632V60.628H36.912V61.24H40.152V62.104H36.912V62.692H40.152V63.556H36.912V64.192H40.86V65.14H31.884V61.936ZM35.796 64.192V63.556H32.94V64.192H35.796ZM35.796 62.692V62.104H32.94V62.692H35.796ZM35.796 61.24V60.628H32.94V61.24H35.796Z" fill="#343A40"/>
    </svg>
  `,
  brand: `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#5E6999"/>
      <g clip-path="url(#clip0_214_1854)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1694 17.3813H18.7665C19.2086 17.3813 19.5665 17.7304 19.5694 18.161V21.5501C19.5694 21.9777 19.2086 22.3268 18.7665 22.3268H13.1694C12.7272 22.3268 12.3665 21.9806 12.3665 21.5501V18.161C12.3665 17.7304 12.7272 17.3813 13.1694 17.3813ZM17.7366 21.0933C17.9694 21.0933 18.1585 20.9101 18.1585 20.6832H18.1555V19.025C18.1555 18.7981 17.9665 18.6148 17.7337 18.6148H14.2108C13.9781 18.6148 13.789 18.7981 13.789 19.025V20.6832C13.789 20.9101 13.9781 21.0933 14.2108 21.0933H17.7366Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.6 17.3813H35.1971C35.6393 17.3813 36 17.7304 36 18.161V21.5501C36 21.9777 35.6393 22.3268 35.1971 22.3268H29.6C29.1579 22.3268 28.8 21.9777 28.8 21.5472V18.1581C28.8 17.7304 29.1579 17.3813 29.6 17.3813ZM33.1171 21.6461C33.1375 21.649 33.4488 21.6228 33.5739 21.585C34.1935 21.4599 34.7113 20.9712 34.7142 20.0548C34.7142 19.4352 34.1295 18.2308 32.2444 18.0533C31.651 18.1435 30.0888 18.7312 30.0888 20.0955C30.0888 20.5348 30.3157 20.9537 30.7026 21.3057C30.9731 21.553 31.3513 21.7043 31.2728 21.6315C31.1506 21.5152 31.1128 21.2737 31.1419 21.1195C31.2233 20.7093 31.555 20.5872 31.555 20.5872C31.555 20.5872 31.4124 21.4861 32.8262 21.6286C32.9106 21.6403 33.1055 21.6461 33.1171 21.6461Z" fill="white"/>
        <path d="M10.6996 17.3818H4.8C4.35782 17.3818 4 17.7309 4 18.1586V22.3273H5.49818V18.8364H6.99927V22.3273H8.50036V18.8364H10.0015V22.3273H11.5025V18.1586C11.5025 17.7309 11.1418 17.3818 10.6996 17.3818Z" fill="white"/>
        <path d="M27.133 17.3818H21.2333C20.7912 17.3818 20.4333 17.7309 20.4333 18.1586V22.3273H21.9315V18.8364H23.4326V22.3273H24.9337V18.8364H26.4348V22.3273H27.9359V18.1586C27.933 17.7309 27.5752 17.3818 27.133 17.3818Z" fill="white"/>
      </g>
      <defs>
        <clipPath>
          <rect width="32" height="4.94545" fill="white" transform="translate(4 17.3818)"/>
        </clipPath>
      </defs>
    </svg>
  `
}

// api 接口
const api = {
  // shopee 全球商品详情接口 - mtsku
  shopeeDetails: async (params) => {
    const response = await fetch(`https://seller.shopee.cn/api/v3/mtsku/get_mtsku_info/?${params}`,{ method: 'get' })
    const resData = await response.json()
    const __affix__ = {
      id: resData.data.mtsku_item_id,
      name: resData.data.name,
      price: [0, 0],
      stock: 0,
    }
    for (const i of resData.data.model_list) {
      __affix__.stock += i.stock_detail.total_available_stock
      if (+i.price_info.normal_price == 0 ) {
        continue
      }
      if (__affix__.price[0] === 0 || __affix__.price[0] === +i.price_info.normal_price) {
        __affix__.price[0] = +i.price_info.normal_price
        continue
      }
      if (__affix__.price[0] > +i.price_info.normal_price) {
        __affix__.price = [+i.price_info.normal_price, __affix__.price[0]]
      } else {
        __affix__.price = [__affix__.price[0], +i.price_info.normal_price]
      }
    }
    return Promise.resolve({__affix__, ...resData})
  },
  // shopee 根据 mtsku 获取 mpsku
  mpskuByMtsku: async (params) => {
    const response = await fetch(`https://seller.shopee.cn/api/v3/mtsku/get_mpsku_price_by_mtsku/?${params}`,{ method: 'get' })
    const resData = await response.json()
  },
  // shopee 店铺商品详情接口 - mpsku
  productDetails: async (params) => {
    const response = await fetch(`https://seller.shopee.cn/api/v3/product/get_product_info?${params}`,{ method: 'get' })
    const resData = await response.json()
    const __affix__ = {
      id: resData.data.product_info.id,
      name: resData.data.product_info.name,
      price: [0, 0],
      stock: 0,
    }
    for (const i of resData.data.product_info.model_list) {
      __affix__.stock += i.stock_detail.total_available_stock
      if (+i.price_info.input_normal_price == 0 ) {
        continue
      }
      if (__affix__.price[0] === 0 || __affix__.price[0] === +i.price_info.input_normal_price) {
        __affix__.price[0] = +i.price_info.input_normal_price
        continue
      }
      if (__affix__.price[0] > +i.price_info.input_normal_price) {
        __affix__.price = [+i.price_info.input_normal_price, __affix__.price[0]]
      } else {
        __affix__.price = [__affix__.price[0], +i.price_info.input_normal_price]
      }
    }
    return Promise.resolve({__affix__, ...resData})
  },
  // shopee 根据 mpsku 获取 mtsku
  mtskuByMpsku: async (params) => {
    const response = await fetch(`https://seller.shopee.cn/api/v3/mtsku/get_mtsku_id_by_mpsku/?${params}`,{ method: 'get' })
    const resData = await response.json()
    return Promise.resolve(resData.data.mtsku_id)
  }
}

// 批量采集注入标识
const injectTarget = {
  tableClass: 'momo-inject-class-table',
  allCheckboxId: 'momo-inject-id-all-checkbox',
  checkboxClass: 'momo-inject-class-checkbox',
}

// 通用 checkbox 事件
function checkedEvent (e, checkAllDomId, checkGroupParentClassName, checkGroupClassName) {
  if (!(e.target.id === checkAllDomId || e.target.classList.contains(checkGroupClassName))) { return }
  const checkAllDom = document.getElementById(checkAllDomId)
  checkAllDom.classList.remove('momo-all-checkbox-noCheckedAll')

  // 全选
  if (e.target.id === checkAllDomId) {
    const checkBoxDoms = document.getElementsByClassName(checkGroupParentClassName)[0].getElementsByClassName(checkGroupClassName)
    for (const i of checkBoxDoms) {
      i.checked = e.target.checked
    }
    return
  }

  // 单选
  let checkAllType = ''
  const checkBoxDoms = document.getElementsByClassName(checkGroupParentClassName)[0].getElementsByClassName(checkGroupClassName)
  if (e.target.checked) {
    checkAllType = 'checkedAll'
    for (const i of checkBoxDoms) {
      if (!i.checked) {
        checkAllType = 'noCheckedAll'
        break
      }
    }
  } else {
    checkAllType = 'noChecked'
    for (const i of checkBoxDoms) {
      if (i.checked) {
        checkAllType = 'noCheckedAll'
        break
      }
    }
  }
  
  if (checkAllType === 'checkedAll') {
    checkAllDom.checked = true
  } else if (checkAllType === 'noChecked') {
    checkAllDom.checked = false
  } else if (checkAllType === 'noCheckedAll') {
    checkAllDom.checked = false
    checkAllDom.classList.add('momo-all-checkbox-noCheckedAll')
  }
}

// 批量采集注入 checkbox 事件
function injectCheckboxEvent (e) {
  checkedEvent(e, injectTarget.allCheckboxId, injectTarget.tableClass, injectTarget.checkboxClass)
}

// 采集仓库 checkbox 事件
function warehouseCheckedEvent (e) {
  checkedEvent(e, 'momo-id-all-checkbox', 'momo-class-table', 'momo-checkbox')
}

// 本地存储仓库
class DBStorage {
  static db = null
  constructor(storageName = web.curWeb.dbStorageName || "MoMoCollectDatabase", tableNames = web.curWeb.dbTableNames || ['product']){
    const request = indexedDB.open(storageName);
    request.onerror = (res) => {
      console.warn('DBStorage 仓库打开失败', res)
    }
    request.onsuccess = e => {
      this.db = e.target.result
    }
  
    request.onupgradeneeded = function (e) {
      const db = e.target.result;

      for (const i of tableNames) {
        const objectStore = db.createObjectStore(i, { keyPath: 'id', autoIncrement: false });
        objectStore.createIndex('value', 'value', { unique: false });
      }
    };
  }
  // 增加数据
  add(val) {
    this.db.transaction([web.curPage.dbTableName], 'readwrite').objectStore(web.curPage.dbTableName).add(val)
  }
  // 插入或覆盖数据
  put(val) {
    this.db.transaction([web.curPage.dbTableName], 'readwrite').objectStore(web.curPage.dbTableName).put(val)
  }
  // 删除数据
  delete(id) {
    this.db.transaction([web.curPage.dbTableName]).objectStore(web.curPage.dbTableName).delete(id)
  }
  // 获取全部数据
  getAll() {
    return this.db.transaction([web.curPage.dbTableName]).objectStore(web.curPage.dbTableName).getAll()
  }
  // 更新是否导入字段
  update(ids, isImport, callback) {
    const result = []
    const objectStore = this.db.transaction([web.curPage.dbTableName], 'readwrite').objectStore(web.curPage.dbTableName)
    for (const id of ids) {
      const request = objectStore.get(id)
      request.onsuccess = event => {
        const data = event.target.result
        data.value.__affix__.isImport = isImport
  
        const requestUpdate = objectStore.put(data)
        requestUpdate.onsuccess = () => {
          result.push(id)
          if (result.length === ids.length) {
            callback && callback(result)
          }
        };
      }
      request.onerror = () => {
        result.push(id)
        if (result.length === ids.length) {
          callback && callback(result)
        }
      }
    }
  }
}

// 采集站点列表
const web = {
  curPage: '',
  curWeb: '',
  db: undefined,
  list: [
    {
      name: 'shopee',
      href: 'https://seller.shopee.cn/',
      dbStorageName: 'MoMoCollectDatabase', // 仓库名称
      dbTableNames: ['product'],
      pages: [ // 采集页面列表
        { // shopee 全球商品列表
          path: /portal\/product\/mtsku\/list/,
          targetId: 'mtsku-list',
          type: 'batch',
          dbTableName: 'product',
          getData: async () => {
            const params = []
            const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
            const cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
            const tableDom = document.getElementsByClassName(injectTarget.tableClass)[0]
            if (!tableDom) { return false }
            const checkBoxDom = tableDom.getElementsByClassName(injectTarget.checkboxClass)
            if (!checkBoxDom.length) { return false }
            for (const i of checkBoxDom) {
              if (i.checked) {
                params.push(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${i.dataset.id}&${cnsc_shop_id}&cbsc_shop_region=my`)
              }
            }

            const promiseList = []
            for (const i of params) {
              promiseList.push(api.shopeeDetails(i))
            }
            const res = await Promise.all(promiseList)
            const data = []
            for (const i of res) {
              data.push({
                data: { mtSkuJson: i.data },
                __affix__: i.__affix__
              })
            }
            return Promise.resolve(data)
          },
          injectDom: () => {
            const rootDom = document.getElementsByClassName(injectTarget.tableClass)[0]
            if (rootDom) {
              const theadDom = rootDom.getElementsByTagName('thead')[0].getElementsByTagName('th')[0]
              theadDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="${injectTarget.allCheckboxId}" class="momo-all-checkbox" />`)
        
              const tbodyTrDoms = rootDom.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
              for (const i of tbodyTrDoms) {
                const id = i.getElementsByClassName('item-id')[0].childNodes[0].innerText.match(/[0-9]+/)
                i.childNodes[0].insertAdjacentHTML('afterbegin', `<input type="checkbox" data-id="${id? id[0] : undefined}" class="momo-checkbox ${injectTarget.checkboxClass}" />`)
              }
            }
            rootDom.addEventListener('click', injectCheckboxEvent)
          }
        },
        { // shopee 全球商品列表详情
          path: /portal\/product\/mtsku\/[0-9]+/,
          type: 'single',
          dbTableName: 'product',
          getData: async () => {
            const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
            const mtsku_item_id = window.location.href.match(/[0-9]+\?/)[0].replace('?', '')
            const cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
            const res = await api.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${mtsku_item_id}&${cnsc_shop_id}&cbsc_shop_region=my`)
            return Promise.resolve({
              data: { mtSkuJson: res.data },
                __affix__: res.__affix__
            })
          }
        },
        { // shopee 店铺商品列表
          path: /portal\/product\/list\/all/,
          targetClass: 'product-list-container',
          type: 'batch',
          dbTableName: 'product',
          getData: async () => {
            const productDetailsPromiseList = []
            const mtskuByMpskuPromiseList = []
            const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
            const cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]
            const tableDom = document.getElementsByClassName(injectTarget.tableClass)[0]
            if (!tableDom) { return false }
            const checkBoxDom = tableDom.getElementsByClassName(injectTarget.checkboxClass)
            if (!checkBoxDom.length) { return false }

            for (const i of checkBoxDom) {
              if (i.checked) {
                productDetailsPromiseList.push(api.productDetails(`${SPC_CDS}&SPC_CDS_VER=2&product_id=${i.dataset.id}&${cnsc_shop_id}&is_draft=false&cbsc_shop_region=my`))
                mtskuByMpskuPromiseList.push(api.mtskuByMpsku(`${SPC_CDS}&SPC_CDS_VER=2&mpsku_id=${i.dataset.id}&${cnsc_shop_id}&cbsc_shop_region=my`))
              }
            }
            const productDetailsRes = await Promise.all(productDetailsPromiseList)
            const mtskuByMpskuRes = await Promise.all(mtskuByMpskuPromiseList)
            
            const shopeeDetailsPromiseList = []
            for (const i of mtskuByMpskuRes) {
              shopeeDetailsPromiseList.push(api.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${i}&${cnsc_shop_id}&cbsc_shop_region=my`))
            }
            const shopeeDetailsRes = await Promise.all(shopeeDetailsPromiseList)

            const data = []
            for (const i in productDetailsRes) {
              data.push({
                data: { mpSkuJson: productDetailsRes[i].data.product_info, mtSkuJson: shopeeDetailsRes[i].data },
                __affix__: productDetailsRes[i].__affix__
              })
            }

            return Promise.resolve(data)

          },
          injectDom: () => {
            const rootDom = document.getElementsByClassName(injectTarget.tableClass)[0]
            if (rootDom) {
              const theadDom = rootDom.getElementsByTagName('thead')[0].getElementsByTagName('th')[0]
              theadDom.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="${injectTarget.allCheckboxId}" class="momo-all-checkbox" />`)
        
              const tbodyTrDoms = rootDom.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
              for (const i of tbodyTrDoms) {
                const id = i.getElementsByClassName('item-id')[0].childNodes[0].innerText.match(/[0-9]+/)
                i.childNodes[0].insertAdjacentHTML('afterbegin', `<input type="checkbox" data-id="${id? id[0] : undefined}" class="momo-checkbox ${injectTarget.checkboxClass}" />`)
              }
            }
            rootDom.addEventListener('click', injectCheckboxEvent)
          },
        },
        { // shopee 店铺商品列表详情
          path: /portal\/product\/[0-9]+/,
          type: 'single',
          apiName: 'productDetails',
          dbTableName: 'product',
          getData: async () => {
            const SPC_CDS = document.cookie.match(/SPC_CDS=.*?;/)[0].replace(';', '')
            const product_id = window.location.href.match(/[0-9]+\?/)[0].replace('?', '')
            const cnsc_shop_id = window.location.href.match(/cnsc_shop_id=[0-9]+/)[0]

            const productDetailsRes = await api.productDetails(`${SPC_CDS}&SPC_CDS_VER=2&product_id=${product_id}&${cnsc_shop_id}&is_draft=false&cbsc_shop_region=my`)
            const mtskuByMpskuRes = await api.mtskuByMpsku(`${SPC_CDS}&SPC_CDS_VER=2&mpsku_id=${product_id}&${cnsc_shop_id}&cbsc_shop_region=my`)
            const shopeeDetailsRes = await api.shopeeDetails(`${SPC_CDS}&SPC_CDS_VER=2&mtsku_item_id=${mtskuByMpskuRes}&${cnsc_shop_id}&cbsc_shop_region=my`)

            return Promise.resolve({
              data: { mpSkuJson: productDetailsRes.data.product_info, mtSkuJson: shopeeDetailsRes.data },
              __affix__: productDetailsRes.__affix__
            })
          }
        },
      ]
    }
  ],
  init: () => {
    const href = window.location.href
    for (const i of web.list) {
      if (window.location.href.startsWith(i.href)) {
        web.curWeb = i
        break
      }
    }
    for (const i of web.curWeb.pages) {
      if(href.match(i.path)) {
        web.curPage = i
        break
      }
    }
    web.db = new DBStorage()
  }
}

// 采集失败 dialog
function collectFailDialog() {
  const destroyDom = document.getElementById('momo-id-collect-fail-dialog')
  destroyDom && destroyDom.remove()
  const dom = `
    <dialog id="momo-id-collect-fail-dialog" class="momo-dialog">
      <form method="dialog">
        <div class="momo-dialog-head">
          <span style="color: #DC3545;">采集失败</span>
          <button class="momo-dialog-close" value="cancel">${icon.colse2}</button>
        </div>
        <div style="padding: 24px 24px 36px 24px; color: #111827;">
          <div style="height: 36px;">因为系统异常，导致商品采集失败，请重新采集。</div>
        </div>
        <div class="momo-dialog-bottom">
          <button class="momo-button momo-button-color-2" value="cancel">我知道了</button>
        </div>
      </form>
    </dialog>
  `
  document.body.insertAdjacentHTML('afterend', dom)
  const dialogDom = document.getElementById("momo-id-collect-fail-dialog");
  dialogDom.showModal();
}

// 采集结果 dialog
function collectResultDialog(val = {type: 'collectFailed', num: 0}) {
  const destroyDom = document.getElementById('collect-id-result-dialog')
  destroyDom && destroyDom.remove()

  const contentDom = {
    collectFailed: {
      title: '采集失败',
      titleColor: '#343A40',
      contentText: '系統異常，商品探集失敗，請重新探集',
      btText: '我知道了',
    },
    collectSuccess: {
      title: '采集成功',
      titleColor: '#343A40',
      contentText: `本次共探集 <span style="color: #5A72DB;">${val.num}</span> 個商品，可到「插件-探集商品庫」中查看已採集商品`,
      btText: '去查看已采集商品庫',
    },
    collectSomeSuccess: {
      title: '部分采集成功',
      titleColor: '#343A40',
      contentText: `部分商品探集成功，本次成功探集 <span style="color: #5A72DB;">${val.num}</span> 個商品，可到「插件-探集商品庫」中查看已探集商品`,
      btText: '去查看已采集商品庫',
    },
    importFailed: {
      title: '導入失敗',
      titleColor: '#343A40',
      contentText: '系统異常，商品導入失败，請重新導入',
      btText: '我知道了',
    },
    importSuccess: {
      title: '导入成功',
      titleColor: '#343A40',
      contentText: `本次共導入 <span style="color: #5A72DB;">${val.num}</span> 個商品，已暂存商品，可到「商品管理-商品列表-暫存-搬家暫存」中確認商品信息後，再上架`,
      btText: '去查看已采集商品庫',
    },
    importSomeSuccess: {
      title: '导入成功',
      titleColor: '#343A40',
      contentText: `部分商品導入失败，本次成功導入 <span style="color: #5A72DB;">${val.num}</span> 個商品，已暂存商品，可到「商品管理-商品列表-暫存-搬家暫存」中確認商品信息後，再上架`,
      btText: '去查看已采集商品庫',
    }
  }

  const dom = `
    <dialog id="collect-id-result-dialog" class="momo-dialog">
      <form method="dialog" style="width: 480px;">
        <div class="momo-dialog-head">
          <span style="color: ${contentDom[val.type].titleColor};">${contentDom[val.type].title}</span>
          <button class="momo-dialog-close" value="cancel">${icon.colse2}</button>
        </div>
        <div style="padding: 24px 24px 36px 24px; color: #111827;">${contentDom[val.type].contentText}</div>
        <div class="momo-dialog-bottom">
          <button id="viewWarehouse" class="momo-button momo-button-color-2" value="cancel">${contentDom[val.type].btText}</button>
        </div>
      </form>
    </dialog>
  `
  document.body.insertAdjacentHTML('afterend', dom)
  const dialogDom = document.getElementById("collect-id-result-dialog");
  dialogDom.showModal();

  const viewWarehouseBt = document.getElementById('viewWarehouse')
  viewWarehouseBt.onclick = () => {
    switch (val.type) {
      case 'collectFailed':
      case 'importFailed':
        break;
      case 'collectSuccess':
      case 'collectSomeSuccess':
        collectWarehouse()
        break;
      case 'importSuccess':
      case 'importSomeSuccess':
        break;
      default:
        console.warn('未知类型')
    }
    
  }
}

// 采集仓库 dialog
function collectWarehouse() {

  const destoryCheckEvent = document.getElementsByClassName('momo-class-table')[0]
  destoryCheckEvent && destoryCheckEvent.removeEventListener('click', warehouseCheckedEvent)
  
  const destroyDom = document.getElementById('momo-id-warehouse-dialog')
  destroyDom && destroyDom.remove()

  web.db.getAll().onsuccess = (res => {
    const tbodyDom = res.target.result.map((i, j) => (`
      <div class="momo-table-tr">
        <div class="momo-table-cell" style="48px">
          <input type="checkbox" class="momo-checkbox" data-index=${j} />
        </div>
        <div class="momo-table-cell" style="flex: 1;">${i.value.__affix__.name}</div>
        <div class="momo-table-cell" style="width: 150px">${i.value.__affix__.price[0].toFixed(2)}${i.value.__affix__.price[1] ? ' - ' + i.value.__affix__.price[1].toFixed(2) : ''}</div>
        <div class="momo-table-cell" style="width: 100px">${i.value.__affix__.stock}</div>
        <div class="momo-table-cell" style="width: 130px">${i.value.__affix__.isImport ? '是' : '否'}</div>
      </div>`)).join('')

    const dom = `
      <dialog id="momo-id-warehouse-dialog" class="momo-dialog">
        <form method="dialog">
          <div class="momo-dialog-head">
            <span style="color: #DC3545;">採集商品庫</span>
            <button id="momo-id-default-cancal" class="momo-dialog-close" value="cancel">${icon.colse2}</button>
          </div>
          <div style="width: 640px; padding: 24px 0; height: 472px;">
            <div class="momo-table momo-class-table">
              <div class="momo-table-thead" style="padding-right: ${res.target.result.length > 6 ? '29px' : '24px'}">
                <div class="momo-table-tr">
                  <div class="momo-table-cell" style="48px">
                    <input type="checkbox" id="momo-id-all-checkbox" class="momo-all-checkbox" />
                  </div>
                  <div class="momo-table-cell" style="flex: 1;">商品名称</div>
                  <div class="momo-table-cell" style="width: 150px">售价</div>
                  <div class="momo-table-cell" style="width: 100px">库存量</div>
                  <div class="momo-table-cell" style="width: 130px">歷史是否已導入</div>
                </div>
              </div>
              <div class="momo-table-tbody" id="momo-id-table-tbody">${tbodyDom}</div>
            </div>
          </div>
        </form>
        <div class="momo-dialog-bottom">
          <button id="momo-id-cancal" class="momo-button momo-button-color-3" value="cancel" style="width: 88px; margin: 0 12px 0 0; color: #343A40;">取消</button>
          <button id="momo-id-import-confirm" class="momo-button momo-button-color-2" value="cancel">確認導入</button>
        </div>
      </dialog>
    `
      document.body.insertAdjacentHTML('afterend', dom)
      const dialogDom = document.getElementById("momo-id-warehouse-dialog");
      dialogDom.showModal();

      const momoTableDom = document.getElementsByClassName('momo-class-table')[0]
      momoTableDom.addEventListener('click', warehouseCheckedEvent)


      // 取消
      const cancalDom = document.getElementById('momo-id-cancal')
      cancalDom.onclick = () => {
        document.getElementById('momo-id-default-cancal').click()
      }

      // 导入
      const confirmDom = document.getElementById('momo-id-import-confirm')
      confirmDom.onclick = () => {
        const data = []
        const checkboxDoms = document.getElementById('momo-id-table-tbody').getElementsByClassName('momo-checkbox')
        for (const i of checkboxDoms) {
          i.checked && data.push(res.target.result[i.dataset.index].value.data)
        }
        // web.db.update(27455488529, true)
        // 向插件发送信息并接受回复
        chrome.runtime.sendMessage({
          type: 'import',
          data: data,
        }, res => {
          if (res.type === 'error') {
            collectResultDialog({type: 'importFailed'})
          } else if (res.type === 'success') {
            collectResultDialog({ type: 'importSuccess', num: res.ids.length })
            web.db.update(res.ids, true, collectWarehouse)
          } else if (res.type === 'someSuccess') {
            collectResultDialog({ type: 'importSomeSuccess', num: res.ids.length })
            web.db.update(res.ids, true, collectWarehouse)
          }
        })
      }
  })
}

// 开启关闭 tip
function switchTip(id, className, type) {
  const tipDom = document.getElementById(id)
  if (type === 'show') {
    tipDom.classList.remove(`${className}-hidden`)
    tipDom.classList.add(`${className}-show`)
  } else {
    tipDom.classList.remove(`${className}-show`)
    tipDom.classList.add(`${className}-hidden`)
  }
}

// 单品采集 tip
function singleCollectTip() {
  const dom = `
    <div id="momo-id-single-collect-tip" class="momo-collect-tip momo-single-collect-tip-hidden">
      <div id="momo-id-single-collect-close" class="icon-close">${icon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">當前頁支持單品採集，<br />請點擊搬家按鈕，採集商品</span>
        <button id="momo-id-single-collect-storage" class="momo-button momo-button-color-1">一鍵搬家</button>
      </div>
      <span class="icon-arrow">${icon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom = document.getElementById('momo-id-single-collect-close')
  closeDom.onclick = () => switchTip('momo-id-single-collect-tip', 'momo-single-collect-tip', 'hidden')

  // 一键搬家
  const singleCollectStorage = document.getElementById('momo-id-single-collect-storage')
  singleCollectStorage.onclick = async () => {
    const res = await web.curPage.getData()
    web.db.put({id: res.__affix__.id, value: res})
    collectResultDialog({type: 'collectSuccess', num: 1})
  }
}

// 批量采集 tip1
function batchCollectTip1() {
  let rootDom = null
  let curRootDom = null
  const dom = `
    <div id="momo-id-batch-collect-tip-1" class="momo-collect-tip momo-batch-collect-tip-1-hidden">
      <div id="momo-id-batch-collect-1-close" class="icon-close">${icon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">當前頁支持批量採集，<br/>請<span style="color: #DC3545">勾選商品</span>後，再點擊搬家按鈕</span>
        <button id="momo-id-batch-collect-button" class="momo-button momo-button-color-1">採集</button>
      </div>
      <span class="icon-arrow">${icon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom1 = document.getElementById('momo-id-batch-collect-1-close')
  closeDom1.onclick = () => switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'hidden')

  // 列表插入选择框
  const batchCollectBt = document.getElementById('momo-id-batch-collect-button')
  batchCollectBt.onclick = () => {
    if (web.curPage.targetId) {
      curRootDom = document.getElementById(web.curPage.targetId)
    } else if (web.curPage.targetClass) {
      curRootDom = document.getElementsByClassName(web.curPage.targetClass)[0]
    }
    if (!curRootDom) {
      throw new Error('列表插入 checkbox 出错')
    }
    if (!curRootDom.classList.contains(injectTarget.tableClass)) {
      rootDom && (rootDom.removeEventListener('click', injectCheckboxEvent))
      rootDom = curRootDom
      rootDom.classList.add(injectTarget.tableClass)
    }
    web.curPage.injectDom()
    switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'hidden')
    switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'show')
  }
}

// 批量采集 tip2
function batchCollectTip2() {
  const dom = `
    <div id="momo-id-batch-collect-tip-2" class="momo-collect-tip momo-batch-collect-tip-2-hidden">
      <div id="momo-id-batch-collect-2-close" class="icon-close">${icon.close1}</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="margin: 0 12px 0 0">請<span style="color: #DC3545">勾選商品</span>後，再點擊搬家按鈕</span>
        <button id="momo-id-batch-collect-storage" class="momo-button momo-button-color-1">一鍵搬家</button>
      </div>
      <span class="icon-arrow">${icon.arrow}</span>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 关闭 tip
  const closeDom2 = document.getElementById('momo-id-batch-collect-2-close')
  closeDom2.onclick = () => switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'hidden')

  // 一键搬家
  const batchCollectStorage = document.getElementById('momo-id-batch-collect-storage')
  batchCollectStorage.onclick = async () => {
    const res = await web.curPage.getData()
    if(!res) {
      switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'hidden')
      switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'show')
      return
    }
    res.forEach(i => web.db.put({ id: i.__affix__.id, value: i }))
    collectResultDialog({type: 'collectSuccess', num: res.length})
  }
}

// 采集浮窗
function collectFloat() {
  const dom = `
    <div class="momo-collect-float" id="momo-id-collect-float">
      <div id="momo-id-float-content" class="momo-collect-float-content">
        <div id="momo-id-open-warehouse">${icon.warehouse}</div>

        <div id="momo-id-open-collect">${icon.collect}</div>
      </div>

      <div id="momo-id-fold-float">${icon.brand}</div>
    </div>
  `
  document.body.insertAdjacentHTML('afterend', dom)

  // 展开收起
  const foldBt = document.getElementById('momo-id-fold-float')
  foldBt.onclick = () => {
    const dom = document.getElementById('momo-id-float-content')
    if (dom.classList.contains('momo-unfold-content')) {
      dom.classList.remove('momo-unfold-content')
      setTimeout(() => foldBt.classList.remove('momo-unfold'), 350)
    } else {
      dom.classList.add('momo-unfold-content')
      foldBt.classList.add('momo-unfold')
    }
  }

  // 仓库
  const warehouseBt = document.getElementById('momo-id-open-warehouse')
  warehouseBt.onclick = () => {
    collectWarehouse()
  }

  // 采集 tips
  const collectBt = document.getElementById('momo-id-open-collect')
  collectBt.onclick = () => {
    switch(web.curPage.type) {
      case 'single':
        switchTip('momo-id-single-collect-tip', 'momo-single-collect-tip', 'show')
        break
      case 'batch':
        const checkDom = document.getElementById(injectTarget.allCheckboxId)
        checkDom ? switchTip('momo-id-batch-collect-tip-2', 'momo-batch-collect-tip-2', 'show') : switchTip('momo-id-batch-collect-tip-1', 'momo-batch-collect-tip-1', 'show')
        break
      default:
        console.warn('类型检测出错')
    }
  }  
}

web.init()
collectFloat()
singleCollectTip()
batchCollectTip1()
batchCollectTip2()


// 接收插件的信息并回复
chrome.runtime.onMessage.addListener((res, sender, sendRes) => {
  switch(res.type) {
    case 'urlChange':
      let usedPage = false
      for (const i of web.curWeb.pages) {
        if(res.url.match(i.path)){
          usedPage = true
          web.curPage = i
          break
        }
      }
      const collectFloatDom = document.getElementById('momo-id-collect-float')
      if (usedPage) {
        collectFloatDom && collectFloatDom.classList.remove('momo-collect-float-hidden')
      } else {
        collectFloatDom && collectFloatDom.classList.add('momo-collect-float-hidden')
      }
      break
    default:
      console.warn('不能处理此消息', res)
  }
})