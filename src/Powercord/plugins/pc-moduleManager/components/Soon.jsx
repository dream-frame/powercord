const { React, i18n: { Messages } } = require('powercord/webpack');

module.exports = class Soon extends React.PureComponent {
  render () {
    return <div className='powercord-plugin-soon powercord-text'>
      <div className='wumpus'>
        <img src='/assets/8c998f8fb62016fcfb4901e424ff378b.svg' alt='wumpus'/>
      </div>
      <p>This part of Powercord is not done yet.</p>
      <p>We're working on it and will release it before 2021.</p>
      <div>
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            DiscordNative.fileManager.showItemInFolder(`${powercord.styleManager.themesDir}/.`);
          }}
        >Open Themes Folder</a>
        <a id="button" href="https://github.com/dream-frame/powercord-for-discord-stable/#how-to-install-plugins-and-thems" target="_blank">Learn how to install themes</a>
      </div>
    </div>;
  }
};
