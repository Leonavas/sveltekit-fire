<script>
	import { User } from 'sveltekit-fire';
	import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth';

	function googleLogin(event) {
		const googleProvider = new GoogleAuthProvider();
		googleProvider.setDefaultLanguage('pt_br');
		signInWithPopup(getAuth(), googleProvider)
			.then((user) => {
				// console.log(user);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function logout() {
		signOut(getAuth());
	}
</script>

<User let:user>
	<div slot="loading">
		<p>Loading...</p>
	</div>
	<div slot="signed-out">
		<p>Signed Out</p>
		<button on:click={googleLogin}> sign in </button>
	</div>
	<p>Hello, {user.displayName} - {user.colData ? user.colData.title : ''}</p>
	<button on:click={logout}> sign out </button>
</User>
