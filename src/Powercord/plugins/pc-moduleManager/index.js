const { existsSync } = require('fs');
const { writeFile, readFile } = require('fs').promises;
const { React, constants: { Permissions }, getModule, getModuleByDisplayName, i18n: { Messages } } = require('powercord/webpack');
const { Icons: { Plugin: PluginIcon, Theme } } = require('powercord/components');
const { inject, uninject } = require('powercord/injector');
const { forceUpdateElement } = require('powercord/util');
const { Plugin } = require('powercord/entities');
const { MAGIC_CHANNELS: { CSS_SNIPPETS, STORE_PLUGINS, STORE_THEMES } } = require('powercord/constants');
const { join } = require('path');

const commands = require('./commands');
const i18n = require('./licenses/index');

const Store = require('./components/store/Store');
const Plugins = require('./components/manage/Plugins');
const Themes = require('./components/manage/Themes');
const SnippetButton = require('./components/SnippetButton');

module.exports = class ModuleManager extends Plugin {
  async startPlugin () {
    powercord.api.i18n.loadAllStrings(i18n);

    Object.values(commands).forEach(cmd =>
      this.registerCommand(cmd.command, cmd.aliases || [],
        cmd.description, cmd.usage,
        cmd.func, cmd.autocompleteFunc
      )
    );

    powercord.api.labs.registerExperiment({
      id: 'pc-moduleManager-themes2',
      name: 'New themes features',
      date: 1587857509321,
      description: 'New Theme management UI & settings',
      usable: false,
      callback: () => {
        // We're supposed to do it properly but reload > all
        setImmediate(() => powercord.pluginManager.remount(this.entityID));
        // And we wrap it in setImmediate to not break the labs UI
      }
    });

    powercord.api.labs.registerExperiment({
      id: 'pc-moduleManager-store',
      name: 'Powercord Store',
      date: 1571961600000,
      description: 'Powercord Plugin and Theme store',
      usable: false,
      callback: () => {
        // We're supposed to do it properly but reload > all
        setImmediate(() => powercord.pluginManager.remount(this.entityID));
        // And we wrap it in setImmediate to not break the labs UI
      }
    });

    this._quickCSS = '';
    this._quickCSSFile = join(__dirname, 'quickcss.css');
    this._loadQuickCSS();
    this._injectSnippets();
    this.loadCSS(join(__dirname, 'scss', 'style.scss'));
    this.registerSettings('pc-moduleManager-plugins', () => Messages.POWERCORD_PLUGINS, Plugins);
    this.registerSettings('pc-moduleManager-themes', () => Messages.POWERCORD_THEMES, Themes);

    if (powercord.api.labs.isExperimentEnabled('pc-moduleManager-store')) {
      this._injectCommunityContent();
      this.registerRoute('/store/plugins', Store, true);
      this.registerRoute('/store/themes', Store, true);
    }
  }

  pluginWillUnload () {
    document.querySelector('#powercord-quickcss').remove();
    powercord.api.labs.unregisterExperiment('pc-moduleManager-store');
    powercord.api.labs.unregisterExperiment('pc-moduleManager-themes');
    powercord.api.labs.unregisterExperiment('pc-moduleManager-snippets');
    uninject('pc-moduleManager-channelItem');
    uninject('pc-moduleManager-channelProps');
    uninject('pc-moduleManager-snippets');
  }

  async _injectCommunityContent () {
    const permissionsModule = await getModule([ 'can' ]);
    inject('pc-moduleManager-channelItem', permissionsModule, 'can', (args, res) => {
      const id = args[1].channelId || args[1].id;
      if (id === STORE_PLUGINS || id === STORE_THEMES) {
        return args[0] === Permissions.VIEW_CHANNEL;
      }
      return res;
    });

    const { transitionTo } = await getModule([ 'transitionTo' ]);
    const ChannelItem = await getModuleByDisplayName('ChannelItem');
    inject('pc-moduleManager-channelProps', ChannelItem.prototype, 'render', function (args, res) {
      const data = {
        [STORE_PLUGINS]: {
          icon: PluginIcon,
          name: Messages.POWERCORD_PLUGINS,
          route: '/_powercord/store/plugins'
        },
        [STORE_THEMES]: {
          icon: Theme,
          name: Messages.POWERCORD_THEMES,
          route: '/_powercord/store/themes'
        }
      };

      if (this.props.channel.id === STORE_PLUGINS || this.props.channel.id === STORE_THEMES) {
        res.props.children[1].props.children[1].props.children = data[this.props.channel.id].name;
        res.props.children[1].props.children[0] = React.createElement(data[this.props.channel.id].icon, {
          className: res.props.children[1].props.children[0].props.className,
          width: 24,
          height: 24
        });
        res.props.onClick = () => transitionTo(data[this.props.channel.id].route);
        delete res.props.onMouseDown;
        delete res.props.onContextMenu;
      }
      return res;
    });

    const { containerDefault } = await getModule([ 'containerDefault' ]);
    forceUpdateElement(`.${containerDefault}`, true);
  }

  async _injectSnippets () {
    const Message = await getModule(m => m.default && m.default.displayName === 'Message');
    inject('pc-moduleManager-snippets', Message, 'default', (args, res) => {
      if (!res.props.children[2] || !res.props.children[2].props.children || res.props.children[2].props.children.type.__powercord_modm === 'owo') {
        return res;
      }

      res.props.children[2].props.children.type.__powercord_modm = 'owo';
      const renderer = res.props.children[2].props.children.type.type;
      res.props.children[2].props.children.type.type = (props) => {
        const res = renderer(props);
        const actions = res && res.props.children && res.props.children.props.children && res.props.children.props.children[1];
        if (actions) {
          const renderer = actions.type;
          actions.type = (props) => {
            const res = renderer(props);
            if (props.channel.id === CSS_SNIPPETS && (/```(?:(?:s?css)|(?:styl(?:us)?)|less)/).test(props.message.content)) {
              res.props.children.unshift(
                React.createElement(SnippetButton, {
                  message: props.message,
                  main: this
                })
              );
            }
            return res;
          };
        }
        return res;
      };
      return res;
    });
    Message.default.displayName = 'Message';
  }

  async _applySnippet (message) {
    let css = '\n\n/**\n';
    const line1 = Messages.POWERCORD_SNIPPET_LINE1.format({ date: new Date() });
    const line2 = Messages.POWERCORD_SNIPPET_LINE2.format({
      authorTag: message.author.tag,
      authorId: message.author.id
    });
    css += ` * ${line1}\n`;
    css += ` * ${line2}\n`;
    css += ` * Snippet ID: ${message.id}\n`;
    css += ' */\n';
    for (const m of message.content.matchAll(/```((?:s?css)|(?:styl(?:us)?)|less)\n?([\s\S]*)`{3}/g)) {
      let snippet = m[2].trim();
      switch (m[1]) {
        case 'scss':
          snippet = '/* lol can\'t do scss for now */';
          break;
        case 'styl':
        case 'stylus':
          snippet = '/* lol can\'t do stylus for now */';
          break;
        case 'less':
          snippet = '/* lol can\'t do less for now */';
          break;
      }
      css += `${snippet}\n`;
    }
    this._saveQuickCSS(this._quickCSS + css);
  }

  async _fetchEntities (type) {
    powercord.api.notices.closeToast('missing-entities-notify');

    const entityManager = powercord[type === 'plugins' ? 'pluginManager' : 'styleManager'];
    const missingEntities = await type === 'plugins' ? entityManager.startPlugins(true) : entityManager.loadThemes(true);
    const entity = missingEntities.length === 1 ? type.slice(0, -1) : type;
    const subjectiveEntity = `${entity} ${entity === type ? 'were' : 'was'}`;

    let props;
    if (missingEntities.length > 0) {
      props = {
        header: `Found ${missingEntities.length} missing ${entity}!`,
        content: React.createElement('div', null,
          `The following ${subjectiveEntity} retrieved:`,
          React.createElement('ul', null, missingEntities.map(entity =>
            React.createElement('li', null, `– ${entity}`))
          )
        ),
        buttons: [ {
          text: 'OK',
          color: 'green',
          look: 'outlined'
        } ],
        type: 'success'
      };
    } else {
      props = {
        header: `No missing ${type} were found - try again later!`,
        type: 'danger',
        timeout: 10e3
      };
    }

    powercord.api.notices.sendToast('missing-entities-notify', props);
  }

  async _loadQuickCSS () {
    this._quickCSSElement = document.createElement('style');
    this._quickCSSElement.id = 'powercord-quickcss';
    document.head.appendChild(this._quickCSSElement);
    if (existsSync(this._quickCSSFile)) {
      this._quickCSS = await readFile(this._quickCSSFile, 'utf8');
      this._quickCSSElement.innerHTML = this._quickCSS;
    }
  }

  async _saveQuickCSS (css) {
    this._quickCSS = css.trim();
    this._quickCSSElement.innerHTML = this._quickCSS;
    await writeFile(this._quickCSSFile, this._quickCSS);
  }
};
