function m(o){window.enmity.plugins.registerPlugin(o)}
function i(...o){return window.enmity.modules.getByProps(...o)}
window.enmity.modules.common,window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native,window.enmity.modules.common.React,window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const t=window.enmity.modules.common.Toasts;window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;
function d(o){return window.enmity.assets.getIDByName(o)}
function s(o){return window.enmity.patcher.create(o)}
var w="FakeProfileThemesAndEffects",c="1.0.0",l="Allows profile theming and the usage of profile effects by hiding the colors and effect ID in your About Me using invisible, zero-width characters",u=[{name:"EquicordDevs.ryan",id:"1234567890"}],r="#00007d",a="https://github.com/Vendicated/FakeProfileThemesAndEffects",y={name:w,version:c,description:l,authors:u,color:r,sourceUrl:a};const n=s("FakeProfileThemesAndEffects"),g=i("openLazy","hideActionSheet");
function h(o){console.log("[FakeProfileThemesAndEffects] Found ActionSheet: "+o),t.open({content:"[FakeProfileThemesAndEffects] Found ActionSheet: "+o,icon:d("Check")})}
const S={...y,onStart(){console.log("[FakeProfileThemesAndEffects] Plugin started."),n.before(g,"openLazy",(o,[p,e])=>h(e))},onStop(){n.unpatchAll()}};m(S);
