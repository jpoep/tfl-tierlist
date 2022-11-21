<script lang="ts">
	import TypeComponent from '$lib/components/pokemon-type.svelte';
	import { type Type as PokenodeType, PokemonClient } from 'pokenode-ts';
	import type { InflatedTeam, PokemonType, Type } from '$lib/types/pokemon.js';
	import { types } from './pokemon-type.svelte';

	export let team: InflatedTeam;
	const allPokemon = Object.values(team.pokemon)
		.flat()
		.map((it) => it.id);
	export let selectedPokemon: string[] = allPokemon;

	type DamageChart = {
		type: Type;
		noDamage: PokemonType[];
		quarterDamage: PokemonType[];
		halfDamage: PokemonType[];
		neutralDamage: PokemonType[];
		doubleDamage: PokemonType[];
		quadrupleDamage: PokemonType[];
	}[];

	const api = new PokemonClient({
		cacheOptions: {
			maxAge: 60 * 1000
		}
	});

	let damageChart: DamageChart;
	let relevantPokemon: PokemonType[];
	let onlyStrongTiers = false;
	let strongPokemon: string[];

	$: strongPokemon = ['S', 'A', 'B']
		.flatMap((tier) => team.pokemon[tier])
		.map((pokemon) => pokemon.id);

	let allTypes: Type[];

	$: allTypes = Object.keys(types) as Type[];

	$: onlyStrongTiers =
		selectedPokemon.sort((a, b) => a.localeCompare(b)) ===
		strongPokemon.sort((a, b) => a.localeCompare(b));

	$: console.log(onlyStrongTiers);
	$: {
		console.log('sel', selectedPokemon);
		console.log('strong', strongPokemon);
	}

	$: relevantPokemon = Object.values(team.pokemon)
		.flat()
		.filter((it) => selectedPokemon.includes(it.id));

	const setOnlyStrongTiers = () => {
		selectedPokemon = strongPokemon;
	};

	// idk how it became so ugly
	$: {
		// eslint-disable-next-line no-inner-declarations
		async function generateChart() {
			const returnChart: DamageChart = allTypes.map((type) => ({
				type,
				noDamage: [],
				quarterDamage: [],
				halfDamage: [],
				neutralDamage: [],
				doubleDamage: [],
				quadrupleDamage: []
			}));
			for (let pokemon of relevantPokemon) {
				const [type1, type2] = pokemon.typing;
				const [apiType1, apiType2]: [PokenodeType, PokenodeType | undefined] = await Promise.all([
					api.getTypeByName(type1),
					type2 && api.getTypeByName(type2)
				]);
				const {
					double_damage_from: type1Double,
					half_damage_from: type1Half,
					no_damage_from: type1No
				} = apiType1.damage_relations;
				const {
					double_damage_from: type2Double,
					half_damage_from: type2Half,
					no_damage_from: type2No
				} = apiType2?.damage_relations || {};

				for (let entry of returnChart) {
					const { type } = entry;
					const no1 = type1No.map((it) => it.name).includes(type) ? 0 : 1;
					const no2 = type2No?.map((it) => it.name).includes(type) ? 0 : 1;
					const double1 = type1Double.map((it) => it.name).includes(type) ? 2 : 1;
					const double2 = type2Double?.map((it) => it.name).includes(type) ? 2 : 1;
					const half1 = type1Half.map((it) => it.name).includes(type) ? 0.5 : 1;
					const half2 = type2Half?.map((it) => it.name).includes(type) ? 0.5 : 1;

					const effectiveness = no1 * no2 * double1 * double2 * half1 * half2;

					const map: {
						[key: number]: PokemonType[];
					} = {
						0: entry.noDamage,
						0.25: entry.quarterDamage,
						0.5: entry.halfDamage,
						1: entry.neutralDamage,
						2: entry.doubleDamage,
						4: entry.quadrupleDamage
					};
					map[effectiveness].push(pokemon);
				}
			}
			return returnChart;
		}
		generateChart().then((returnChart) => {
			damageChart = returnChart;
		});
	}

	function count(pokemon: PokemonType[]) {
		return pokemon.length;
	}
</script>

<input
	id="strongPokemon"
	type="checkbox"
	checked={onlyStrongTiers}
	on:change={() => (!onlyStrongTiers ? setOnlyStrongTiers() : (selectedPokemon = allPokemon))}
/>
<label for="strongPokemon">Nur S, A und B-Tier</label>

<table>
	<tr>
		<th>Type</th>
		<!-- <th>0×</th>
		<th>¼×</th>
		<th>½×</th>
		<th>1×</th>
		<th>2×</th>
		<th>4×</th> -->
		<th>Resist</th>
		<th>Neutral</th>
		<th>Weak</th>
	</tr>
	{#if damageChart}
		{#each damageChart as entry}
			<tr>
				<td><TypeComponent type1={entry.type} /></td>
				<td>{count(entry.noDamage) + count(entry.quarterDamage) + count(entry.halfDamage)}</td>
				<td>{count(entry.neutralDamage)} </td>
				<td>{count(entry.doubleDamage) + count(entry.quadrupleDamage)}</td>
				<td />
				<!-- <td>{count(entry.noDamage)}</td>
			<td>{count(entry.quarterDamage)}</td>
			<td>{count(entry.halfDamage)}</td>
			<td>{count(entry.neutralDamage)}</td>
			<td>{count(entry.doubleDamage)}</td>
			<td>{count(entry.quadrupleDamage)}</td> -->
			</tr>
		{/each}
	{/if}
	<!-- <tr>
		<td>Summe</td>
		<td>{damageChart.flatMap((it) => it.noDamage.length).reduce((acc, cur) => acc + cur, 0)}</td>
		<td
			>{damageChart.flatMap((it) => it.quarterDamage.length).reduce((acc, cur) => acc + cur, 0)}</td
		>
		<td>{damageChart.flatMap((it) => it.halfDamage.length).reduce((acc, cur) => acc + cur, 0)}</td>
		<td
			>{damageChart.flatMap((it) => it.neutralDamage.length).reduce((acc, cur) => acc + cur, 0)}</td
		>
		<td>{damageChart.flatMap((it) => it.doubleDamage.length).reduce((acc, cur) => acc + cur, 0)}</td
		>
		<td
			>{damageChart
				.flatMap((it) => it.quadrupleDamage.length)
				.reduce((acc, cur) => acc + cur, 0)}</td
		>
	</tr> -->
	<tr>
		<td>Summe</td>
		<td
			>{damageChart
				?.flatMap((it) => it.noDamage.length + it.halfDamage.length + it.quarterDamage.length)
				.reduce((acc, cur) => acc + cur, 0)}</td
		>
		<td
			>{damageChart
				?.flatMap((it) => it.neutralDamage.length)
				.reduce((acc, cur) => acc + cur, 0)}</td
		>
		<td
			>{damageChart
				?.flatMap((it) => it.doubleDamage.length + it.quadrupleDamage.length)
				.reduce((acc, cur) => acc + cur, 0)}</td
		>
	</tr>
</table>

<style lang="scss">
	td {
		text-align: center;
		width: 4rem;
		font-size: 1.5rem;
		line-height: 1rem;
	}
</style>
