import { Battle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';
import { MAX_TEAM_MEMBERS_NUM, UUID } from '@src/Common';
import { FactionBattle } from '@src/Faction';
import { ObjectId } from 'bson';

import { TeamNormal } from './TeamNormal';

/**
 * 队伍(战斗状态)
 */
export class TeamBattle implements TeamNormal, UUID {
  name: string;
  /**队伍id */
  uuid: string;
  /**队伍成员 */
  members: Array<CharacterBattle>;
  /**队伍所处的阵营 */
  faction: FactionBattle;
  /**队伍所处的战斗 */
  battle: Battle;
  /**指令点,用于施放技能 */
  orderPoint: number; //指令点,用于施放技能
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(team: TeamNormal, faction: FactionBattle) {
    this.uuid = new ObjectId().toHexString();
    this.name = team.name;
    this.orderPoint = 0;

    this.faction = faction;
    this.battle = faction.battle;

    this.members = [];
    this.addMembers(...team.members.map((eachMemberNormal) => new CharacterBattle(eachMemberNormal, this)));
  }

  /** 队伍是否"存活",只要队伍至少有一人存活,则队伍存活 */
  get isAlive(): boolean {
    return this.members.some((eachMember) => eachMember.isAlive);
  }

  addMembers(...members: Array<CharacterBattle>): void {
    members.forEach((eachMember) => {
      this.members.push(eachMember);
    });
  }

  // includes(id: string): boolean {
  //     throw new Error('Method not implemented.');
  // }

  // addMember(member: CharacterBattle): void {
  //     throw new Error('Method not implemented.');
  // }

  // removeMember(member: CharacterBattle): void {
  //     throw new Error('Method not implemented.');
  // }

  // swapMember(memberA: CharacterBattle, memberB: CharacterBattle): void {
  //     throw new Error('Method not implemented.');
  // }

  // replaceMember(memberBefore: CharacterBattle, memberAfter: CharacterBattle): void {
  //     throw new Error('Method not implemented.');
  // }

  includes(id: string): boolean {
    return this.members.map((each) => each.id).includes(id);
  }

  addMember(member: CharacterBattle): void {
    if (this.members.includes(member)) {
      throw new Error(`[${member.id}]${member.name}已在队伍中`);
    }
    if (this.members.length >= MAX_TEAM_MEMBERS_NUM) {
      throw new Error(`队伍成员数已达上限(${MAX_TEAM_MEMBERS_NUM})`);
    }
    this.members.push(member);
  }

  removeMember(member: CharacterBattle): void {
    if (!this.members.includes(member)) {
      throw new Error(`[${member.id}]${member.name}不在队伍中`);
    }
    this.members.splice(this.members.indexOf(member), 1);
  }

  swapMember(memberA: CharacterBattle, memberB: CharacterBattle): void {
    if (!this.members.includes(memberA)) {
      throw new Error(`[${memberA.id}]${memberA.name}不在队伍中`);
    }
    if (!this.members.includes(memberB)) {
      throw new Error(`[${memberB.id}]${memberB.name}不在队伍中`);
    }
    const indexA = this.members.indexOf(memberA);
    const indexB = this.members.indexOf(memberB);
    this.members.splice(indexA, 1, memberB);
    this.members.splice(indexB, 1, memberA);
  }

  replaceMember(memberBefore: CharacterBattle, memberAfter: CharacterBattle): void {
    const index = this.members.indexOf(memberBefore);
    if (index === -1) {
      throw new Error(`[${memberBefore.id}]${memberBefore.name}不在队伍中`);
    }
    this.members.splice(index, 1, memberAfter);
  }
}
