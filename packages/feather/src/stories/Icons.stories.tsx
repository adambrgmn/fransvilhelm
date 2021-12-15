import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Icon, IconProps } from '../Icon';
import * as Icons from '../Icons';

export default {
  title: 'Icon',
  component: Icon,
} as Meta;

export const All: Story<IconProps & { icon: keyof typeof Icons }> = (props) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '1rem' }}>
      {Object.entries(Icons).map(([key, Icon]) => (
        <Icon key={key} {...props} />
      ))}
    </div>
  );
};

export const Activity: Story<IconProps> = (props) => (
  <Icons.Activity {...props} />
);
Activity.args = { baseline: false };

export const Airplay: Story<IconProps> = (props) => (
  <Icons.Airplay {...props} />
);
Airplay.args = { baseline: false };

export const AlertCircle: Story<IconProps> = (props) => (
  <Icons.AlertCircle {...props} />
);
AlertCircle.args = { baseline: false };

export const AlertOctagon: Story<IconProps> = (props) => (
  <Icons.AlertOctagon {...props} />
);
AlertOctagon.args = { baseline: false };

export const AlertTriangle: Story<IconProps> = (props) => (
  <Icons.AlertTriangle {...props} />
);
AlertTriangle.args = { baseline: false };

export const AlignCenter: Story<IconProps> = (props) => (
  <Icons.AlignCenter {...props} />
);
AlignCenter.args = { baseline: false };

export const AlignJustify: Story<IconProps> = (props) => (
  <Icons.AlignJustify {...props} />
);
AlignJustify.args = { baseline: false };

export const AlignLeft: Story<IconProps> = (props) => (
  <Icons.AlignLeft {...props} />
);
AlignLeft.args = { baseline: false };

export const AlignRight: Story<IconProps> = (props) => (
  <Icons.AlignRight {...props} />
);
AlignRight.args = { baseline: false };

export const Anchor: Story<IconProps> = (props) => <Icons.Anchor {...props} />;
Anchor.args = { baseline: false };

export const Aperture: Story<IconProps> = (props) => (
  <Icons.Aperture {...props} />
);
Aperture.args = { baseline: false };

export const Archive: Story<IconProps> = (props) => (
  <Icons.Archive {...props} />
);
Archive.args = { baseline: false };

export const ArrowDownCircle: Story<IconProps> = (props) => (
  <Icons.ArrowDownCircle {...props} />
);
ArrowDownCircle.args = { baseline: false };

export const ArrowDownLeft: Story<IconProps> = (props) => (
  <Icons.ArrowDownLeft {...props} />
);
ArrowDownLeft.args = { baseline: false };

export const ArrowDownRight: Story<IconProps> = (props) => (
  <Icons.ArrowDownRight {...props} />
);
ArrowDownRight.args = { baseline: false };

export const ArrowDown: Story<IconProps> = (props) => (
  <Icons.ArrowDown {...props} />
);
ArrowDown.args = { baseline: false };

export const ArrowLeftCircle: Story<IconProps> = (props) => (
  <Icons.ArrowLeftCircle {...props} />
);
ArrowLeftCircle.args = { baseline: false };

export const ArrowLeft: Story<IconProps> = (props) => (
  <Icons.ArrowLeft {...props} />
);
ArrowLeft.args = { baseline: false };

export const ArrowRightCircle: Story<IconProps> = (props) => (
  <Icons.ArrowRightCircle {...props} />
);
ArrowRightCircle.args = { baseline: false };

export const ArrowRight: Story<IconProps> = (props) => (
  <Icons.ArrowRight {...props} />
);
ArrowRight.args = { baseline: false };

export const ArrowUpCircle: Story<IconProps> = (props) => (
  <Icons.ArrowUpCircle {...props} />
);
ArrowUpCircle.args = { baseline: false };

export const ArrowUpLeft: Story<IconProps> = (props) => (
  <Icons.ArrowUpLeft {...props} />
);
ArrowUpLeft.args = { baseline: false };

export const ArrowUpRight: Story<IconProps> = (props) => (
  <Icons.ArrowUpRight {...props} />
);
ArrowUpRight.args = { baseline: false };

export const ArrowUp: Story<IconProps> = (props) => (
  <Icons.ArrowUp {...props} />
);
ArrowUp.args = { baseline: false };

export const AtSign: Story<IconProps> = (props) => <Icons.AtSign {...props} />;
AtSign.args = { baseline: false };

export const Award: Story<IconProps> = (props) => <Icons.Award {...props} />;
Award.args = { baseline: false };

export const BarChart2: Story<IconProps> = (props) => (
  <Icons.BarChart2 {...props} />
);
BarChart2.args = { baseline: false };

export const BarChart: Story<IconProps> = (props) => (
  <Icons.BarChart {...props} />
);
BarChart.args = { baseline: false };

export const BatteryCharging: Story<IconProps> = (props) => (
  <Icons.BatteryCharging {...props} />
);
BatteryCharging.args = { baseline: false };

export const Battery: Story<IconProps> = (props) => (
  <Icons.Battery {...props} />
);
Battery.args = { baseline: false };

export const BellOff: Story<IconProps> = (props) => (
  <Icons.BellOff {...props} />
);
BellOff.args = { baseline: false };

export const Bell: Story<IconProps> = (props) => <Icons.Bell {...props} />;
Bell.args = { baseline: false };

export const Bluetooth: Story<IconProps> = (props) => (
  <Icons.Bluetooth {...props} />
);
Bluetooth.args = { baseline: false };

export const Bold: Story<IconProps> = (props) => <Icons.Bold {...props} />;
Bold.args = { baseline: false };

export const BookOpen: Story<IconProps> = (props) => (
  <Icons.BookOpen {...props} />
);
BookOpen.args = { baseline: false };

export const Book: Story<IconProps> = (props) => <Icons.Book {...props} />;
Book.args = { baseline: false };

export const Bookmark: Story<IconProps> = (props) => (
  <Icons.Bookmark {...props} />
);
Bookmark.args = { baseline: false };

export const Box: Story<IconProps> = (props) => <Icons.Box {...props} />;
Box.args = { baseline: false };

export const Briefcase: Story<IconProps> = (props) => (
  <Icons.Briefcase {...props} />
);
Briefcase.args = { baseline: false };

export const Calendar: Story<IconProps> = (props) => (
  <Icons.Calendar {...props} />
);
Calendar.args = { baseline: false };

export const CameraOff: Story<IconProps> = (props) => (
  <Icons.CameraOff {...props} />
);
CameraOff.args = { baseline: false };

export const Camera: Story<IconProps> = (props) => <Icons.Camera {...props} />;
Camera.args = { baseline: false };

export const Cast: Story<IconProps> = (props) => <Icons.Cast {...props} />;
Cast.args = { baseline: false };

export const CheckCircle: Story<IconProps> = (props) => (
  <Icons.CheckCircle {...props} />
);
CheckCircle.args = { baseline: false };

export const CheckSquare: Story<IconProps> = (props) => (
  <Icons.CheckSquare {...props} />
);
CheckSquare.args = { baseline: false };

export const Check: Story<IconProps> = (props) => <Icons.Check {...props} />;
Check.args = { baseline: false };

export const ChevronDown: Story<IconProps> = (props) => (
  <Icons.ChevronDown {...props} />
);
ChevronDown.args = { baseline: false };

export const ChevronLeft: Story<IconProps> = (props) => (
  <Icons.ChevronLeft {...props} />
);
ChevronLeft.args = { baseline: false };

export const ChevronRight: Story<IconProps> = (props) => (
  <Icons.ChevronRight {...props} />
);
ChevronRight.args = { baseline: false };

export const ChevronUp: Story<IconProps> = (props) => (
  <Icons.ChevronUp {...props} />
);
ChevronUp.args = { baseline: false };

export const ChevronsDown: Story<IconProps> = (props) => (
  <Icons.ChevronsDown {...props} />
);
ChevronsDown.args = { baseline: false };

export const ChevronsLeft: Story<IconProps> = (props) => (
  <Icons.ChevronsLeft {...props} />
);
ChevronsLeft.args = { baseline: false };

export const ChevronsRight: Story<IconProps> = (props) => (
  <Icons.ChevronsRight {...props} />
);
ChevronsRight.args = { baseline: false };

export const ChevronsUp: Story<IconProps> = (props) => (
  <Icons.ChevronsUp {...props} />
);
ChevronsUp.args = { baseline: false };

export const Chrome: Story<IconProps> = (props) => <Icons.Chrome {...props} />;
Chrome.args = { baseline: false };

export const Circle: Story<IconProps> = (props) => <Icons.Circle {...props} />;
Circle.args = { baseline: false };

export const Clipboard: Story<IconProps> = (props) => (
  <Icons.Clipboard {...props} />
);
Clipboard.args = { baseline: false };

export const Clock: Story<IconProps> = (props) => <Icons.Clock {...props} />;
Clock.args = { baseline: false };

export const CloudDrizzle: Story<IconProps> = (props) => (
  <Icons.CloudDrizzle {...props} />
);
CloudDrizzle.args = { baseline: false };

export const CloudLightning: Story<IconProps> = (props) => (
  <Icons.CloudLightning {...props} />
);
CloudLightning.args = { baseline: false };

export const CloudOff: Story<IconProps> = (props) => (
  <Icons.CloudOff {...props} />
);
CloudOff.args = { baseline: false };

export const CloudRain: Story<IconProps> = (props) => (
  <Icons.CloudRain {...props} />
);
CloudRain.args = { baseline: false };

export const CloudSnow: Story<IconProps> = (props) => (
  <Icons.CloudSnow {...props} />
);
CloudSnow.args = { baseline: false };

export const Cloud: Story<IconProps> = (props) => <Icons.Cloud {...props} />;
Cloud.args = { baseline: false };

export const Code: Story<IconProps> = (props) => <Icons.Code {...props} />;
Code.args = { baseline: false };

export const Codepen: Story<IconProps> = (props) => (
  <Icons.Codepen {...props} />
);
Codepen.args = { baseline: false };

export const Codesandbox: Story<IconProps> = (props) => (
  <Icons.Codesandbox {...props} />
);
Codesandbox.args = { baseline: false };

export const Coffee: Story<IconProps> = (props) => <Icons.Coffee {...props} />;
Coffee.args = { baseline: false };

export const Columns: Story<IconProps> = (props) => (
  <Icons.Columns {...props} />
);
Columns.args = { baseline: false };

export const Command: Story<IconProps> = (props) => (
  <Icons.Command {...props} />
);
Command.args = { baseline: false };

export const Compass: Story<IconProps> = (props) => (
  <Icons.Compass {...props} />
);
Compass.args = { baseline: false };

export const Copy: Story<IconProps> = (props) => <Icons.Copy {...props} />;
Copy.args = { baseline: false };

export const CornerDownLeft: Story<IconProps> = (props) => (
  <Icons.CornerDownLeft {...props} />
);
CornerDownLeft.args = { baseline: false };

export const CornerDownRight: Story<IconProps> = (props) => (
  <Icons.CornerDownRight {...props} />
);
CornerDownRight.args = { baseline: false };

export const CornerLeftDown: Story<IconProps> = (props) => (
  <Icons.CornerLeftDown {...props} />
);
CornerLeftDown.args = { baseline: false };

export const CornerLeftUp: Story<IconProps> = (props) => (
  <Icons.CornerLeftUp {...props} />
);
CornerLeftUp.args = { baseline: false };

export const CornerRightDown: Story<IconProps> = (props) => (
  <Icons.CornerRightDown {...props} />
);
CornerRightDown.args = { baseline: false };

export const CornerRightUp: Story<IconProps> = (props) => (
  <Icons.CornerRightUp {...props} />
);
CornerRightUp.args = { baseline: false };

export const CornerUpLeft: Story<IconProps> = (props) => (
  <Icons.CornerUpLeft {...props} />
);
CornerUpLeft.args = { baseline: false };

export const CornerUpRight: Story<IconProps> = (props) => (
  <Icons.CornerUpRight {...props} />
);
CornerUpRight.args = { baseline: false };

export const Cpu: Story<IconProps> = (props) => <Icons.Cpu {...props} />;
Cpu.args = { baseline: false };

export const CreditCard: Story<IconProps> = (props) => (
  <Icons.CreditCard {...props} />
);
CreditCard.args = { baseline: false };

export const Crop: Story<IconProps> = (props) => <Icons.Crop {...props} />;
Crop.args = { baseline: false };

export const Crosshair: Story<IconProps> = (props) => (
  <Icons.Crosshair {...props} />
);
Crosshair.args = { baseline: false };

export const Database: Story<IconProps> = (props) => (
  <Icons.Database {...props} />
);
Database.args = { baseline: false };

export const Delete: Story<IconProps> = (props) => <Icons.Delete {...props} />;
Delete.args = { baseline: false };

export const Disc: Story<IconProps> = (props) => <Icons.Disc {...props} />;
Disc.args = { baseline: false };

export const DivideCircle: Story<IconProps> = (props) => (
  <Icons.DivideCircle {...props} />
);
DivideCircle.args = { baseline: false };

export const DivideSquare: Story<IconProps> = (props) => (
  <Icons.DivideSquare {...props} />
);
DivideSquare.args = { baseline: false };

export const Divide: Story<IconProps> = (props) => <Icons.Divide {...props} />;
Divide.args = { baseline: false };

export const DollarSign: Story<IconProps> = (props) => (
  <Icons.DollarSign {...props} />
);
DollarSign.args = { baseline: false };

export const DownloadCloud: Story<IconProps> = (props) => (
  <Icons.DownloadCloud {...props} />
);
DownloadCloud.args = { baseline: false };

export const Download: Story<IconProps> = (props) => (
  <Icons.Download {...props} />
);
Download.args = { baseline: false };

export const Dribbble: Story<IconProps> = (props) => (
  <Icons.Dribbble {...props} />
);
Dribbble.args = { baseline: false };

export const Droplet: Story<IconProps> = (props) => (
  <Icons.Droplet {...props} />
);
Droplet.args = { baseline: false };

export const Edit2: Story<IconProps> = (props) => <Icons.Edit2 {...props} />;
Edit2.args = { baseline: false };

export const Edit3: Story<IconProps> = (props) => <Icons.Edit3 {...props} />;
Edit3.args = { baseline: false };

export const Edit: Story<IconProps> = (props) => <Icons.Edit {...props} />;
Edit.args = { baseline: false };

export const ExternalLink: Story<IconProps> = (props) => (
  <Icons.ExternalLink {...props} />
);
ExternalLink.args = { baseline: false };

export const EyeOff: Story<IconProps> = (props) => <Icons.EyeOff {...props} />;
EyeOff.args = { baseline: false };

export const Eye: Story<IconProps> = (props) => <Icons.Eye {...props} />;
Eye.args = { baseline: false };

export const Facebook: Story<IconProps> = (props) => (
  <Icons.Facebook {...props} />
);
Facebook.args = { baseline: false };

export const FastForward: Story<IconProps> = (props) => (
  <Icons.FastForward {...props} />
);
FastForward.args = { baseline: false };

export const Feather: Story<IconProps> = (props) => (
  <Icons.Feather {...props} />
);
Feather.args = { baseline: false };

export const Figma: Story<IconProps> = (props) => <Icons.Figma {...props} />;
Figma.args = { baseline: false };

export const FileMinus: Story<IconProps> = (props) => (
  <Icons.FileMinus {...props} />
);
FileMinus.args = { baseline: false };

export const FilePlus: Story<IconProps> = (props) => (
  <Icons.FilePlus {...props} />
);
FilePlus.args = { baseline: false };

export const FileText: Story<IconProps> = (props) => (
  <Icons.FileText {...props} />
);
FileText.args = { baseline: false };

export const File: Story<IconProps> = (props) => <Icons.File {...props} />;
File.args = { baseline: false };

export const Film: Story<IconProps> = (props) => <Icons.Film {...props} />;
Film.args = { baseline: false };

export const Filter: Story<IconProps> = (props) => <Icons.Filter {...props} />;
Filter.args = { baseline: false };

export const Flag: Story<IconProps> = (props) => <Icons.Flag {...props} />;
Flag.args = { baseline: false };

export const FolderMinus: Story<IconProps> = (props) => (
  <Icons.FolderMinus {...props} />
);
FolderMinus.args = { baseline: false };

export const FolderPlus: Story<IconProps> = (props) => (
  <Icons.FolderPlus {...props} />
);
FolderPlus.args = { baseline: false };

export const Folder: Story<IconProps> = (props) => <Icons.Folder {...props} />;
Folder.args = { baseline: false };

export const Framer: Story<IconProps> = (props) => <Icons.Framer {...props} />;
Framer.args = { baseline: false };

export const Frown: Story<IconProps> = (props) => <Icons.Frown {...props} />;
Frown.args = { baseline: false };

export const Gift: Story<IconProps> = (props) => <Icons.Gift {...props} />;
Gift.args = { baseline: false };

export const GitBranch: Story<IconProps> = (props) => (
  <Icons.GitBranch {...props} />
);
GitBranch.args = { baseline: false };

export const GitCommit: Story<IconProps> = (props) => (
  <Icons.GitCommit {...props} />
);
GitCommit.args = { baseline: false };

export const GitMerge: Story<IconProps> = (props) => (
  <Icons.GitMerge {...props} />
);
GitMerge.args = { baseline: false };

export const GitPullRequest: Story<IconProps> = (props) => (
  <Icons.GitPullRequest {...props} />
);
GitPullRequest.args = { baseline: false };

export const Github: Story<IconProps> = (props) => <Icons.Github {...props} />;
Github.args = { baseline: false };

export const Gitlab: Story<IconProps> = (props) => <Icons.Gitlab {...props} />;
Gitlab.args = { baseline: false };

export const Globe: Story<IconProps> = (props) => <Icons.Globe {...props} />;
Globe.args = { baseline: false };

export const Grid: Story<IconProps> = (props) => <Icons.Grid {...props} />;
Grid.args = { baseline: false };

export const HardDrive: Story<IconProps> = (props) => (
  <Icons.HardDrive {...props} />
);
HardDrive.args = { baseline: false };

export const Hash: Story<IconProps> = (props) => <Icons.Hash {...props} />;
Hash.args = { baseline: false };

export const Headphones: Story<IconProps> = (props) => (
  <Icons.Headphones {...props} />
);
Headphones.args = { baseline: false };

export const Heart: Story<IconProps> = (props) => <Icons.Heart {...props} />;
Heart.args = { baseline: false };

export const HelpCircle: Story<IconProps> = (props) => (
  <Icons.HelpCircle {...props} />
);
HelpCircle.args = { baseline: false };

export const Hexagon: Story<IconProps> = (props) => (
  <Icons.Hexagon {...props} />
);
Hexagon.args = { baseline: false };

export const Home: Story<IconProps> = (props) => <Icons.Home {...props} />;
Home.args = { baseline: false };

export const Image: Story<IconProps> = (props) => <Icons.Image {...props} />;
Image.args = { baseline: false };

export const Inbox: Story<IconProps> = (props) => <Icons.Inbox {...props} />;
Inbox.args = { baseline: false };

export const Info: Story<IconProps> = (props) => <Icons.Info {...props} />;
Info.args = { baseline: false };

export const Instagram: Story<IconProps> = (props) => (
  <Icons.Instagram {...props} />
);
Instagram.args = { baseline: false };

export const Italic: Story<IconProps> = (props) => <Icons.Italic {...props} />;
Italic.args = { baseline: false };

export const Key: Story<IconProps> = (props) => <Icons.Key {...props} />;
Key.args = { baseline: false };

export const Layers: Story<IconProps> = (props) => <Icons.Layers {...props} />;
Layers.args = { baseline: false };

export const Layout: Story<IconProps> = (props) => <Icons.Layout {...props} />;
Layout.args = { baseline: false };

export const LifeBuoy: Story<IconProps> = (props) => (
  <Icons.LifeBuoy {...props} />
);
LifeBuoy.args = { baseline: false };

export const Link2: Story<IconProps> = (props) => <Icons.Link2 {...props} />;
Link2.args = { baseline: false };

export const Link: Story<IconProps> = (props) => <Icons.Link {...props} />;
Link.args = { baseline: false };

export const Linkedin: Story<IconProps> = (props) => (
  <Icons.Linkedin {...props} />
);
Linkedin.args = { baseline: false };

export const List: Story<IconProps> = (props) => <Icons.List {...props} />;
List.args = { baseline: false };

export const Loader: Story<IconProps> = (props) => <Icons.Loader {...props} />;
Loader.args = { baseline: false };

export const Lock: Story<IconProps> = (props) => <Icons.Lock {...props} />;
Lock.args = { baseline: false };

export const LogIn: Story<IconProps> = (props) => <Icons.LogIn {...props} />;
LogIn.args = { baseline: false };

export const LogOut: Story<IconProps> = (props) => <Icons.LogOut {...props} />;
LogOut.args = { baseline: false };

export const Mail: Story<IconProps> = (props) => <Icons.Mail {...props} />;
Mail.args = { baseline: false };

export const MapPin: Story<IconProps> = (props) => <Icons.MapPin {...props} />;
MapPin.args = { baseline: false };

export const Map: Story<IconProps> = (props) => <Icons.Map {...props} />;
Map.args = { baseline: false };

export const Maximize2: Story<IconProps> = (props) => (
  <Icons.Maximize2 {...props} />
);
Maximize2.args = { baseline: false };

export const Maximize: Story<IconProps> = (props) => (
  <Icons.Maximize {...props} />
);
Maximize.args = { baseline: false };

export const Meh: Story<IconProps> = (props) => <Icons.Meh {...props} />;
Meh.args = { baseline: false };

export const Menu: Story<IconProps> = (props) => <Icons.Menu {...props} />;
Menu.args = { baseline: false };

export const MessageCircle: Story<IconProps> = (props) => (
  <Icons.MessageCircle {...props} />
);
MessageCircle.args = { baseline: false };

export const MessageSquare: Story<IconProps> = (props) => (
  <Icons.MessageSquare {...props} />
);
MessageSquare.args = { baseline: false };

export const MicOff: Story<IconProps> = (props) => <Icons.MicOff {...props} />;
MicOff.args = { baseline: false };

export const Mic: Story<IconProps> = (props) => <Icons.Mic {...props} />;
Mic.args = { baseline: false };

export const Minimize2: Story<IconProps> = (props) => (
  <Icons.Minimize2 {...props} />
);
Minimize2.args = { baseline: false };

export const Minimize: Story<IconProps> = (props) => (
  <Icons.Minimize {...props} />
);
Minimize.args = { baseline: false };

export const MinusCircle: Story<IconProps> = (props) => (
  <Icons.MinusCircle {...props} />
);
MinusCircle.args = { baseline: false };

export const MinusSquare: Story<IconProps> = (props) => (
  <Icons.MinusSquare {...props} />
);
MinusSquare.args = { baseline: false };

export const Minus: Story<IconProps> = (props) => <Icons.Minus {...props} />;
Minus.args = { baseline: false };

export const Monitor: Story<IconProps> = (props) => (
  <Icons.Monitor {...props} />
);
Monitor.args = { baseline: false };

export const Moon: Story<IconProps> = (props) => <Icons.Moon {...props} />;
Moon.args = { baseline: false };

export const MoreHorizontal: Story<IconProps> = (props) => (
  <Icons.MoreHorizontal {...props} />
);
MoreHorizontal.args = { baseline: false };

export const MoreVertical: Story<IconProps> = (props) => (
  <Icons.MoreVertical {...props} />
);
MoreVertical.args = { baseline: false };

export const MousePointer: Story<IconProps> = (props) => (
  <Icons.MousePointer {...props} />
);
MousePointer.args = { baseline: false };

export const Move: Story<IconProps> = (props) => <Icons.Move {...props} />;
Move.args = { baseline: false };

export const Music: Story<IconProps> = (props) => <Icons.Music {...props} />;
Music.args = { baseline: false };

export const Navigation2: Story<IconProps> = (props) => (
  <Icons.Navigation2 {...props} />
);
Navigation2.args = { baseline: false };

export const Navigation: Story<IconProps> = (props) => (
  <Icons.Navigation {...props} />
);
Navigation.args = { baseline: false };

export const Octagon: Story<IconProps> = (props) => (
  <Icons.Octagon {...props} />
);
Octagon.args = { baseline: false };

export const Package: Story<IconProps> = (props) => (
  <Icons.Package {...props} />
);
Package.args = { baseline: false };

export const Paperclip: Story<IconProps> = (props) => (
  <Icons.Paperclip {...props} />
);
Paperclip.args = { baseline: false };

export const PauseCircle: Story<IconProps> = (props) => (
  <Icons.PauseCircle {...props} />
);
PauseCircle.args = { baseline: false };

export const Pause: Story<IconProps> = (props) => <Icons.Pause {...props} />;
Pause.args = { baseline: false };

export const PenTool: Story<IconProps> = (props) => (
  <Icons.PenTool {...props} />
);
PenTool.args = { baseline: false };

export const Percent: Story<IconProps> = (props) => (
  <Icons.Percent {...props} />
);
Percent.args = { baseline: false };

export const PhoneCall: Story<IconProps> = (props) => (
  <Icons.PhoneCall {...props} />
);
PhoneCall.args = { baseline: false };

export const PhoneForwarded: Story<IconProps> = (props) => (
  <Icons.PhoneForwarded {...props} />
);
PhoneForwarded.args = { baseline: false };

export const PhoneIncoming: Story<IconProps> = (props) => (
  <Icons.PhoneIncoming {...props} />
);
PhoneIncoming.args = { baseline: false };

export const PhoneMissed: Story<IconProps> = (props) => (
  <Icons.PhoneMissed {...props} />
);
PhoneMissed.args = { baseline: false };

export const PhoneOff: Story<IconProps> = (props) => (
  <Icons.PhoneOff {...props} />
);
PhoneOff.args = { baseline: false };

export const PhoneOutgoing: Story<IconProps> = (props) => (
  <Icons.PhoneOutgoing {...props} />
);
PhoneOutgoing.args = { baseline: false };

export const Phone: Story<IconProps> = (props) => <Icons.Phone {...props} />;
Phone.args = { baseline: false };

export const PieChart: Story<IconProps> = (props) => (
  <Icons.PieChart {...props} />
);
PieChart.args = { baseline: false };

export const PlayCircle: Story<IconProps> = (props) => (
  <Icons.PlayCircle {...props} />
);
PlayCircle.args = { baseline: false };

export const Play: Story<IconProps> = (props) => <Icons.Play {...props} />;
Play.args = { baseline: false };

export const PlusCircle: Story<IconProps> = (props) => (
  <Icons.PlusCircle {...props} />
);
PlusCircle.args = { baseline: false };

export const PlusSquare: Story<IconProps> = (props) => (
  <Icons.PlusSquare {...props} />
);
PlusSquare.args = { baseline: false };

export const Plus: Story<IconProps> = (props) => <Icons.Plus {...props} />;
Plus.args = { baseline: false };

export const Pocket: Story<IconProps> = (props) => <Icons.Pocket {...props} />;
Pocket.args = { baseline: false };

export const Power: Story<IconProps> = (props) => <Icons.Power {...props} />;
Power.args = { baseline: false };

export const Printer: Story<IconProps> = (props) => (
  <Icons.Printer {...props} />
);
Printer.args = { baseline: false };

export const Radio: Story<IconProps> = (props) => <Icons.Radio {...props} />;
Radio.args = { baseline: false };

export const RefreshCcw: Story<IconProps> = (props) => (
  <Icons.RefreshCcw {...props} />
);
RefreshCcw.args = { baseline: false };

export const RefreshCw: Story<IconProps> = (props) => (
  <Icons.RefreshCw {...props} />
);
RefreshCw.args = { baseline: false };

export const Repeat: Story<IconProps> = (props) => <Icons.Repeat {...props} />;
Repeat.args = { baseline: false };

export const Rewind: Story<IconProps> = (props) => <Icons.Rewind {...props} />;
Rewind.args = { baseline: false };

export const RotateCcw: Story<IconProps> = (props) => (
  <Icons.RotateCcw {...props} />
);
RotateCcw.args = { baseline: false };

export const RotateCw: Story<IconProps> = (props) => (
  <Icons.RotateCw {...props} />
);
RotateCw.args = { baseline: false };

export const Rss: Story<IconProps> = (props) => <Icons.Rss {...props} />;
Rss.args = { baseline: false };

export const Save: Story<IconProps> = (props) => <Icons.Save {...props} />;
Save.args = { baseline: false };

export const Scissors: Story<IconProps> = (props) => (
  <Icons.Scissors {...props} />
);
Scissors.args = { baseline: false };

export const Search: Story<IconProps> = (props) => <Icons.Search {...props} />;
Search.args = { baseline: false };

export const Send: Story<IconProps> = (props) => <Icons.Send {...props} />;
Send.args = { baseline: false };

export const Server: Story<IconProps> = (props) => <Icons.Server {...props} />;
Server.args = { baseline: false };

export const Settings: Story<IconProps> = (props) => (
  <Icons.Settings {...props} />
);
Settings.args = { baseline: false };

export const Share2: Story<IconProps> = (props) => <Icons.Share2 {...props} />;
Share2.args = { baseline: false };

export const Share: Story<IconProps> = (props) => <Icons.Share {...props} />;
Share.args = { baseline: false };

export const ShieldOff: Story<IconProps> = (props) => (
  <Icons.ShieldOff {...props} />
);
ShieldOff.args = { baseline: false };

export const Shield: Story<IconProps> = (props) => <Icons.Shield {...props} />;
Shield.args = { baseline: false };

export const ShoppingBag: Story<IconProps> = (props) => (
  <Icons.ShoppingBag {...props} />
);
ShoppingBag.args = { baseline: false };

export const ShoppingCart: Story<IconProps> = (props) => (
  <Icons.ShoppingCart {...props} />
);
ShoppingCart.args = { baseline: false };

export const Shuffle: Story<IconProps> = (props) => (
  <Icons.Shuffle {...props} />
);
Shuffle.args = { baseline: false };

export const Sidebar: Story<IconProps> = (props) => (
  <Icons.Sidebar {...props} />
);
Sidebar.args = { baseline: false };

export const SkipBack: Story<IconProps> = (props) => (
  <Icons.SkipBack {...props} />
);
SkipBack.args = { baseline: false };

export const SkipForward: Story<IconProps> = (props) => (
  <Icons.SkipForward {...props} />
);
SkipForward.args = { baseline: false };

export const Slack: Story<IconProps> = (props) => <Icons.Slack {...props} />;
Slack.args = { baseline: false };

export const Slash: Story<IconProps> = (props) => <Icons.Slash {...props} />;
Slash.args = { baseline: false };

export const Sliders: Story<IconProps> = (props) => (
  <Icons.Sliders {...props} />
);
Sliders.args = { baseline: false };

export const Smartphone: Story<IconProps> = (props) => (
  <Icons.Smartphone {...props} />
);
Smartphone.args = { baseline: false };

export const Smile: Story<IconProps> = (props) => <Icons.Smile {...props} />;
Smile.args = { baseline: false };

export const Speaker: Story<IconProps> = (props) => (
  <Icons.Speaker {...props} />
);
Speaker.args = { baseline: false };

export const Square: Story<IconProps> = (props) => <Icons.Square {...props} />;
Square.args = { baseline: false };

export const Star: Story<IconProps> = (props) => <Icons.Star {...props} />;
Star.args = { baseline: false };

export const StopCircle: Story<IconProps> = (props) => (
  <Icons.StopCircle {...props} />
);
StopCircle.args = { baseline: false };

export const Sun: Story<IconProps> = (props) => <Icons.Sun {...props} />;
Sun.args = { baseline: false };

export const Sunrise: Story<IconProps> = (props) => (
  <Icons.Sunrise {...props} />
);
Sunrise.args = { baseline: false };

export const Sunset: Story<IconProps> = (props) => <Icons.Sunset {...props} />;
Sunset.args = { baseline: false };

export const Tablet: Story<IconProps> = (props) => <Icons.Tablet {...props} />;
Tablet.args = { baseline: false };

export const Tag: Story<IconProps> = (props) => <Icons.Tag {...props} />;
Tag.args = { baseline: false };

export const Target: Story<IconProps> = (props) => <Icons.Target {...props} />;
Target.args = { baseline: false };

export const Terminal: Story<IconProps> = (props) => (
  <Icons.Terminal {...props} />
);
Terminal.args = { baseline: false };

export const Thermometer: Story<IconProps> = (props) => (
  <Icons.Thermometer {...props} />
);
Thermometer.args = { baseline: false };

export const ThumbsDown: Story<IconProps> = (props) => (
  <Icons.ThumbsDown {...props} />
);
ThumbsDown.args = { baseline: false };

export const ThumbsUp: Story<IconProps> = (props) => (
  <Icons.ThumbsUp {...props} />
);
ThumbsUp.args = { baseline: false };

export const ToggleLeft: Story<IconProps> = (props) => (
  <Icons.ToggleLeft {...props} />
);
ToggleLeft.args = { baseline: false };

export const ToggleRight: Story<IconProps> = (props) => (
  <Icons.ToggleRight {...props} />
);
ToggleRight.args = { baseline: false };

export const Tool: Story<IconProps> = (props) => <Icons.Tool {...props} />;
Tool.args = { baseline: false };

export const Trash2: Story<IconProps> = (props) => <Icons.Trash2 {...props} />;
Trash2.args = { baseline: false };

export const Trash: Story<IconProps> = (props) => <Icons.Trash {...props} />;
Trash.args = { baseline: false };

export const Trello: Story<IconProps> = (props) => <Icons.Trello {...props} />;
Trello.args = { baseline: false };

export const TrendingDown: Story<IconProps> = (props) => (
  <Icons.TrendingDown {...props} />
);
TrendingDown.args = { baseline: false };

export const TrendingUp: Story<IconProps> = (props) => (
  <Icons.TrendingUp {...props} />
);
TrendingUp.args = { baseline: false };

export const Triangle: Story<IconProps> = (props) => (
  <Icons.Triangle {...props} />
);
Triangle.args = { baseline: false };

export const Truck: Story<IconProps> = (props) => <Icons.Truck {...props} />;
Truck.args = { baseline: false };

export const Tv: Story<IconProps> = (props) => <Icons.Tv {...props} />;
Tv.args = { baseline: false };

export const Twitch: Story<IconProps> = (props) => <Icons.Twitch {...props} />;
Twitch.args = { baseline: false };

export const Twitter: Story<IconProps> = (props) => (
  <Icons.Twitter {...props} />
);
Twitter.args = { baseline: false };

export const Type: Story<IconProps> = (props) => <Icons.Type {...props} />;
Type.args = { baseline: false };

export const Umbrella: Story<IconProps> = (props) => (
  <Icons.Umbrella {...props} />
);
Umbrella.args = { baseline: false };

export const Underline: Story<IconProps> = (props) => (
  <Icons.Underline {...props} />
);
Underline.args = { baseline: false };

export const Unlock: Story<IconProps> = (props) => <Icons.Unlock {...props} />;
Unlock.args = { baseline: false };

export const UploadCloud: Story<IconProps> = (props) => (
  <Icons.UploadCloud {...props} />
);
UploadCloud.args = { baseline: false };

export const Upload: Story<IconProps> = (props) => <Icons.Upload {...props} />;
Upload.args = { baseline: false };

export const UserCheck: Story<IconProps> = (props) => (
  <Icons.UserCheck {...props} />
);
UserCheck.args = { baseline: false };

export const UserMinus: Story<IconProps> = (props) => (
  <Icons.UserMinus {...props} />
);
UserMinus.args = { baseline: false };

export const UserPlus: Story<IconProps> = (props) => (
  <Icons.UserPlus {...props} />
);
UserPlus.args = { baseline: false };

export const UserX: Story<IconProps> = (props) => <Icons.UserX {...props} />;
UserX.args = { baseline: false };

export const User: Story<IconProps> = (props) => <Icons.User {...props} />;
User.args = { baseline: false };

export const Users: Story<IconProps> = (props) => <Icons.Users {...props} />;
Users.args = { baseline: false };

export const VideoOff: Story<IconProps> = (props) => (
  <Icons.VideoOff {...props} />
);
VideoOff.args = { baseline: false };

export const Video: Story<IconProps> = (props) => <Icons.Video {...props} />;
Video.args = { baseline: false };

export const Voicemail: Story<IconProps> = (props) => (
  <Icons.Voicemail {...props} />
);
Voicemail.args = { baseline: false };

export const Volume1: Story<IconProps> = (props) => (
  <Icons.Volume1 {...props} />
);
Volume1.args = { baseline: false };

export const Volume2: Story<IconProps> = (props) => (
  <Icons.Volume2 {...props} />
);
Volume2.args = { baseline: false };

export const VolumeX: Story<IconProps> = (props) => (
  <Icons.VolumeX {...props} />
);
VolumeX.args = { baseline: false };

export const Volume: Story<IconProps> = (props) => <Icons.Volume {...props} />;
Volume.args = { baseline: false };

export const Watch: Story<IconProps> = (props) => <Icons.Watch {...props} />;
Watch.args = { baseline: false };

export const WifiOff: Story<IconProps> = (props) => (
  <Icons.WifiOff {...props} />
);
WifiOff.args = { baseline: false };

export const Wifi: Story<IconProps> = (props) => <Icons.Wifi {...props} />;
Wifi.args = { baseline: false };

export const Wind: Story<IconProps> = (props) => <Icons.Wind {...props} />;
Wind.args = { baseline: false };

export const XCircle: Story<IconProps> = (props) => (
  <Icons.XCircle {...props} />
);
XCircle.args = { baseline: false };

export const XOctagon: Story<IconProps> = (props) => (
  <Icons.XOctagon {...props} />
);
XOctagon.args = { baseline: false };

export const XSquare: Story<IconProps> = (props) => (
  <Icons.XSquare {...props} />
);
XSquare.args = { baseline: false };

export const X: Story<IconProps> = (props) => <Icons.X {...props} />;
X.args = { baseline: false };

export const Youtube: Story<IconProps> = (props) => (
  <Icons.Youtube {...props} />
);
Youtube.args = { baseline: false };

export const ZapOff: Story<IconProps> = (props) => <Icons.ZapOff {...props} />;
ZapOff.args = { baseline: false };

export const Zap: Story<IconProps> = (props) => <Icons.Zap {...props} />;
Zap.args = { baseline: false };

export const ZoomIn: Story<IconProps> = (props) => <Icons.ZoomIn {...props} />;
ZoomIn.args = { baseline: false };

export const ZoomOut: Story<IconProps> = (props) => (
  <Icons.ZoomOut {...props} />
);
ZoomOut.args = { baseline: false };
