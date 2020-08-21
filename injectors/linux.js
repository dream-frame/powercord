const { join } = require('path');
const { existsSync } = require('fs');
const { execSync } = require('child_process');

exports.getAppDir = async () => {
  const discordProcess = execSync('ps x')
    .toString()
    .split('\n')
    .map(s => s.split(' ').filter(Boolean))
    .find(p => p[4] && (/discord/i).test(p[4]) && p.includes('--type=renderer'));

  if (!discordProcess) {
    console.log('Cannot find Discord process, falling back to legacy path detection.');
    const paths = [
      '/usr/share/discord',
      '/usr/lib64/discord',
      '/opt/discord',
      '/opt/Discord'
    ];
    const discordPath = paths.find(path => existsSync(path));
    return join(discordPath, 'resources', 'app');
  }

  const discordPath = discordProcess[4].split('/');
  discordPath.splice(discordPath.length - 1, 1);
  return join('/', ...discordPath, 'resources', 'app');
};
