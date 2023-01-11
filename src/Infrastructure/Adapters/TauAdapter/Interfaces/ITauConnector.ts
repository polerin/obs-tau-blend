import IServiceAdapter from "Infrastructure/Interfaces/IServiceAdapter";
import { FrameworkMessageSet, SystemMessageCallback } from "Shared/MessageHandling";
import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { TauEvents } from "../Definitions/TauEvents";

export default interface ITauAdapter extends IServiceAdapter<SystemMessageCallback, FrameworkMessageSet>
{

}