package games_java.GuessTheNumber;

import java.util.Scanner;

public class GuessTheNumber {
	public static void main(String[] args) {
		// create the user input scanner object
		Scanner sc = new Scanner(System.in);

		// your code goes here!
		double number = Math.random() * 99 + 1;
		int num = (int) (number);
		int guess = 0;

		while (guess != num) {
			System.out.println("Guess the number 1-100!");
			guess = sc.nextInt();
			if (guess > num) {
				System.out.println("Too high");
			} else if (guess < num) {
				System.out.println("Too low");
			}
		}
		System.out.println("Correct");

		sc.close(); // close the scanner
		System.exit(0); // exit the program
	}
}
