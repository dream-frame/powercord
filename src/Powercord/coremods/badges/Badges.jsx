/**
 * Copyright (c) 2018-2020 aetheryx & Bowser65
 * All Rights Reserved. Licensed under the Porkord License
 * https://powercord.dev/porkord-license
 */

const { shell: { openExternal } } = require('electron');
const { open: openModal } = require('powercord/modal');
const { Clickable, Tooltip, Icons: { badges: BadgeIcons } } = require('powercord/components');
const { React, getModule, constants: { Routes }, i18n: { Messages } } = require('powercord/webpack');
const { WEBSITE, I18N_WEBSITE, GUILD_ID, DISCORD_INVITE, REPO_URL } = require('powercord/constants');
const DonateModal = require('./DonateModal');

async function goToPowercord () {
  const store = await getModule([ 'getGuilds' ]);
  if (store.getGuilds()[GUILD_ID]) {
    const router = await getModule([ 'transitionTo' ]);
    const channel = await getModule([ 'getLastSelectedChannelId' ]);
    const userProfileModal = await getModule([ 'fetchProfile' ]);
    // eslint-disable-next-line new-cap
    router.transitionTo(Routes.CHANNEL(GUILD_ID, channel.getChannelId(GUILD_ID)));
    userProfileModal.close();
  } else {
    const windowManager = await getModule([ 'flashFrame', 'minimize' ]);
    const { INVITE_BROWSER: { handler: popInvite } } = await getModule([ 'INVITE_BROWSER' ]);
    const oldMinimize = windowManager.minimize;
    windowManager.minimize = () => void 0;
    popInvite({ args: { code: DISCORD_INVITE } });
    windowManager.minimize = oldMinimize;
  }
}

const Base = React.memo(({ color, tooltip, tooltipPosition, onClick, className, children }) => {
  const { profileBadge, profileBadgeWrapper } = getModule([ 'profileBadges' ], false);
  return (
    <div className={`${profileBadgeWrapper} powercord-badge`} style={{ color: `#${color || '7289da'}` }}>
      <Tooltip text={tooltip} position={tooltipPosition || 'top' }>
        <Clickable onClick={onClick || (() => void 0)} className={`${profileBadge} ${className}`}>
          {children}
        </Clickable>
      </Tooltip>
    </div>
  );
});

const Custom = React.memo(({ name, icon, white, tooltipPosition }) => (
  <Base
    tooltipPosition={tooltipPosition}
    onClick={() => openModal(DonateModal)}
    className='powercord-badge-cutie'
    tooltip={name}
  >
    <img src={icon} alt='Custom badge'/>
    {white && <img src={white} alt='Custom badge'/>}
  </Base>
));

const Developer = React.memo(({ color }) => (
  <Base
    onClick={() => openExternal(`${WEBSITE}/contributors`)}
    className='powercord-badge-developer'
    tooltip={Messages.POWERCORD_BADGES_DEVELOPER}
    color={color}
  >
    <BadgeIcons.Developer/>
  </Base>
));

const Staff = React.memo(({ color }) => (
  <Base
    onClick={() => goToPowercord()}
    className='powercord-badge-staff'
    tooltip={Messages.POWERCORD_BADGES_STAFF}
    color={color}
  >
    <BadgeIcons.Staff/>
  </Base>
));

const Support = React.memo(({ color }) => (
  <Base
    onClick={() => goToPowercord()}
    className='powercord-badge-support'
    tooltip={Messages.POWERCORD_BADGES_SUPPORT}
    color={color}
  >
    <BadgeIcons.Support/>
  </Base>
));

const Contributor = React.memo(({ color }) => (
  <Base
    onClick={() => openExternal(`${WEBSITE}/contributors`)}
    className='powercord-badge-contributor'
    tooltip={Messages.POWERCORD_BADGES_CONTRIBUTOR}
    color={color}
  >
    <BadgeIcons.Contributor/>
  </Base>
));

const Translator = React.memo(({ color }) => ( // @todo: flag
  <Base
    onClick={() => openExternal(I18N_WEBSITE)}
    className='powercord-badge-translator'
    tooltip={Messages.POWERCORD_BADGES_TRANSLATOR}
    color={color}
  >
    <BadgeIcons.Translator/>
  </Base>
));

const BugHunter = React.memo(({ color }) => (
  <Base
    onClick={() => openExternal(`https://github.com/${REPO_URL}/issues?q=label:bug`)}
    className='powercord-badge-hunter'
    tooltip={Messages.POWERCORD_BADGES_HUNTER}
    color={color}
  >
    <BadgeIcons.Hunter/>
  </Base>
));

const EarlyUser = React.memo(({ color }) => (
  <Base
    className='powercord-badge-early'
    tooltip={Messages.POWERCORD_BADGES_EARLY}
    color={color}
  >
    <BadgeIcons.Early/>
  </Base>
));

module.exports = {
  Custom,
  Developer,
  Staff,
  Support,
  Contributor,
  Translator,
  BugHunter,
  EarlyUser
};
